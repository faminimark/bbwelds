import { verifyPassword } from '../utils/password';
import { PrismaClient, users as User } from '@prisma/client'
import { sign } from 'hono/jwt'

const prisma = new PrismaClient();

export const login = async (username: string, password: string): Promise<{verified: boolean, error: string | undefined, token: string | undefined, user_id: string | undefined }  > =>  {
    const user: User | null = await prisma.contacts.findUnique({
        where: {
            contact_type: 'email',
            value: username
        }
    }).users();

    if(!user) return { verified: false, error: 'User not found', token: undefined, user_id: undefined }

    const auth = await prisma.auth.findFirst({
            where: {
                user_id: user.user_id
            }
        })
    
    if(!auth) return { verified: false, error: 'User not registered', token: undefined, user_id: undefined }

    const verified = await verifyPassword(password, auth?.password)
    
    if(!verified) return { verified: false, error: 'Incorrect Password', token: undefined, user_id: undefined }

    const { f_name: fname, user_id } = user;
    const exp = Math.floor(Date.now() / 1000) + ((60 * 60) * 24) * 60

    const token = await sign({ fname, user_id, exp }, process.env.TOKEN_SIGNATURE);

    return { verified: true, error: undefined, token, user_id }
}