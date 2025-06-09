import { HTTPException } from 'hono/http-exception'
import { PrismaClient, posts as Posts, category_types, status_enum, image_type, image_urls as Images, votes as Votes } from '@prisma/client'
import { Storage } from '@google-cloud/storage'
import { v2 } from '@google-cloud/storage-control'

interface PostWithImages extends Posts {
  images: Images[]
  votes: Omit<Votes, 'vote_id' | 'voteable_type'> | null | undefined
}

const prisma = new PrismaClient();

const googleCredentials = {
    keyFilename: './src/config/key.json',
    projectId: process.env.GOOGLE_PROJECT_ID
}

//Set up for G storage bucket/control to create a new folder if folder doesn't exist
const bucketName = 'build-bard-gallery'
const storage = new Storage(googleCredentials)
const controlClient = new v2.StorageControlClient(googleCredentials)

const bucket = storage.bucket(bucketName)
const bucketPath = controlClient.bucketPath('_', bucketName);

type GetPostInput = {
    post_id: string;
    user_id: number;
}

type CreatePostOutput = {
    //TODO
}

export const getPost = async (
    {post_id, user_id}: GetPostInput
): Promise<PostWithImages> => {
    const post: Posts | null = await prisma.posts.findUnique({
        where: {
            post_id: Number(post_id)
        },
        include: {
            users: {
                omit: {
                    company_id: true,
                    created_at: true,
                    location_id: true,
                    profile_description: true,
                }
            },
            comments: {
                include: {
                    users: true
                },
                omit: {
                    comment_id: true,
                    vote_id: true,
                    post_id: true,
                }
            }
        }
    });

    const image_url: Images[] = await prisma.image_urls.findMany({
       where: {
        imageable_id: Number(post_id),
        image_type: 'post'
       }
    });

    const include = user_id ? {
        user_votes: {
        where: {
            user_id
        }
        }
    }: {}

    const votes = await prisma.votes.findFirst({
        where: {
          voteable_type: 'post',
          voteable_id: Number(post_id)
        },
        omit: {
          vote_id: true,
          voteable_type: true
        },
        include
    })

    if(!post) throw new HTTPException(404, { message: 'Post not found'})

    return {...post, images: image_url, votes: votes ?? undefined};
};

export const createPost = async (
    formData: FormData //fix this type after formData
): Promise<any> => {
    const files = formData.getAll('files')
    const category = formData.get('category') as category_types
    const title = formData.get('title') as string
    const description = formData.get('description') as string
    const tag = formData.get('tag') as string

    const user_id = formData.get('user_id') as string; //Build context for these
    const USER_FOLDER = `gallery-${user_id}`
    // TODO: refactor this to use GetFolder instead, this will be a bottleneck after a thousand users
    const [folders] = await controlClient.listFolders({
        parent: bucketPath,
    });

    const userFolderExist = Boolean(folders.filter(({ name }) =>  name === `projects/_/buckets/${bucketName}/folders/gallery-${user_id}/`).length)

    if(!userFolderExist) await controlClient.createFolder({
        parent: bucketPath,
        folderId: USER_FOLDER
    });
    
    const uploadResults = []

    try {
        const post = await prisma.posts.create({
            data: {
                category,
                title,
                user_id: Number(user_id),
                description,
                // post_tags: {
                //     createMany: {
                //         data: tag // TODO fix client to do this with a comma
                //     }
                // }
            }
        })

        for (let i = 0; i < files.length; i++) {
            const file = files[i]
            
            if (!(file instanceof File)) {
                uploadResults.push({
                index: i,
                error: 'Invalid file object'
                })
                continue
            }

            try {
                const timestamp = Date.now()
                const fileName = `${USER_FOLDER}/${timestamp}-${i}-${file.name}`
                const fileRef = bucket.file(fileName)
                
                const arrayBuffer = await file.arrayBuffer()
                const buffer = Buffer.from(arrayBuffer)
                
                await fileRef.save(buffer, {
                    metadata: {
                        contentType: file.type,
                    },
                })

                uploadResults.push({
                    index: i,
                    originalName: file.name,
                    fileName: fileName,
                    size: file.size,
                    contentType: file.type,
                    publicUrl: `https://storage.googleapis.com/${bucketName}/${fileName}`
                })

            } catch (error) {
                uploadResults.push({
                    index: i,
                    originalName: file.name,
                    error: error
                })
            }
        }

        const fileNames = uploadResults.map((res) => ({
            image_url: res.publicUrl ?? '',
            image_type: image_type.post,
            status: status_enum.active,
            imageable_id: post.post_id
        }))

        await prisma.image_urls.createManyAndReturn({
            data: fileNames,
        });

        return {
            message: 'Upload process completed',
            results: uploadResults
        }

    } catch (error) {
        console.error('Upload error:', error)
        return { error: 'Upload failed', details: error }
    }

};
