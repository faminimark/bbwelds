import { verifyPassword } from '../utils/password';
import { PrismaClient, users as User } from '@prisma/client'
const prisma = new PrismaClient();

export const login = async (username: string, password: string): Promise<{verified: boolean, error: string | undefined }  > =>  {
    const user: User | null = await prisma.users.findUnique({
            where: {
                email: username
            }
        });

    if(!user) return { verified: false, error: 'User not found' }

    const auth = await prisma.auth.findFirst({
            where: {
                user_id: user.user_id
            }
        })
    
    if(!auth) return { verified: false, error: 'User not registered' }

    const verified = await verifyPassword(password, auth?.password)
    
    if(!verified) return { verified: false, error: 'Incorrect Password' }
    
    return { verified: true, error: undefined }
}