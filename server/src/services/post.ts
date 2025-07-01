import { HTTPException } from 'hono/http-exception'
import { PrismaClient, posts as Posts, status_enum, image_type, image_urls as Images, votes as Votes } from '@prisma/client'
import uploadImage from '../utils/upload-to-gcp'

interface PostWithImages extends Posts {
  images: Images[]
  votes: Omit<Votes, 'vote_id' | 'voteable_type'> | null | undefined
  profile_image: string
}

const prisma = new PrismaClient();

type GetPostInput = {
    post_id: string;
    user_id: string;
}

type CreatePostOutput = {
    //TODO
}

export const getPost = async (
    {post_id, user_id}: GetPostInput
): Promise<PostWithImages> => {
    const post: Posts | null = await prisma.posts.findUnique({
        where: {
            post_id
        },
        include: {
            post_tags: {
                select: {
                    tag: true
                }
            },
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
                    post_id: true,
                }
            }
        }
    });

    const include = user_id ? {
        user_votes: {
        where: {
            user_id
        }
        }
    }: {}

    const [image_url, profile_image, votes] = await Promise.all([
        prisma.image_urls.findMany({
        where: {
            imageable_id: post_id,
            image_type: 'post'
        }
        }),
        prisma.image_urls.findFirst({
            where: {
            image_type: 'user',
            imageable_id: post?.user_id,
            status: 'active'
            },
        }),
        prisma.votes.findFirst({
            where: {
            voteable_type: 'post',
            voteable_id: post_id
            },
            omit: {
            vote_id: true,
            voteable_type: true
            },
            include
        })
    ])

    if(!post) throw new HTTPException(404, { message: 'Post not found'})

    return {...post, images: image_url, profile_image: profile_image?.image_url ?? '', votes: votes ?? undefined};
};

export const createPost = async (
    formData: FormData
): Promise<any> => {
    const files = formData.getAll('files')
    const category = formData.get('category') as string
    const categories = category?.split(',') as string[]
    const title = formData.get('title') as string
    const description = formData.get('description') as string

    const user_id = formData.get('user_id') as string; //Build context for these

    try {
        const post = await prisma.posts.create({
            data: {
                title,
                user_id: user_id,
                description,
                post_tags: {
                    createMany: {
                        data: [...categories.map((category)=> ({ tag: category}))]
                    }
                }
            }
        })

        const uploadResults = await uploadImage(user_id, files)

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
