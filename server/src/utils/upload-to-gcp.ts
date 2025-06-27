import { Storage } from '@google-cloud/storage'
import { v2 } from '@google-cloud/storage-control'

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

const uploadImage = async (user_id: string, files: FormDataEntryValue[]) => {
    if(!user_id) throw new Error('User is required please login, then try again')
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

    return uploadResults
    
}

export default uploadImage