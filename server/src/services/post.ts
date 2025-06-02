import { HTTPException } from 'hono/http-exception'
import { PrismaClient, posts as Posts } from '@prisma/client'
import { serializer } from '../utils';
import { Storage } from '@google-cloud/storage'
import { v2 } from '@google-cloud/storage-control'

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
    post_id: string
}

type CreatePostInput = {
}

export const getPost = async (
    query?: GetPostInput
): Promise<Posts> => {
    const posts: Posts | null = await prisma.posts.findUnique({
        where: {
            post_id: Number(query?.post_id)
        },
        include: {
            users: {
                omit: {
                    company_id: true,
                    created_at: true,
                    location_id: true,
                    profile_description: true,
                }
            }
        }
    });

    if(!posts) throw new HTTPException(404, { message: 'Post not found'})

    return serializer(posts);
};

export const createPost = async (
    formData: FormData //fix this type after formData
): Promise<any> => {
    const files = formData.getAll('files')
    const user_id = formData.get('user_id') as string; //Build context for these
    
    // Run request
    const [folders] = await controlClient.listFolders({
        parent: bucketPath,
    });

    const userFolderExist = Boolean(folders.filter(({ name }) => {console.log(name) 
        return name === `projects/_/buckets/${bucketName}/folders/gallery-${user_id}/`}).length)

    if(!userFolderExist) await controlClient.createFolder({
        parent: bucketPath,
        folderId: `gallery-${user_id}`
    });
    
    const uploadResults = []

    try{
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
            const fileName = `gallery-${user_id}/${timestamp}-${i}-${file.name}`
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

    return {
      message: 'Upload process completed',
      results: uploadResults
    }

  } catch (error) {
    console.error('Upload error:', error)
    return { error: 'Upload failed', details: error }
  }

};
