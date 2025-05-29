import { PrismaClient, locations as Location, users as User } from '@prisma/client'
import { serializer } from '../utils';
import { hashPassword } from '../utils/password';
import { HTTPException } from 'hono/http-exception';
const prisma = new PrismaClient();

type PostInput = {
    post_id: string
}

export const createUser = async (
    data?: any
): Promise<any> => {
    const { city, 
            country, 
            state: state_region, 
            zip: zip_postal, email, 
            fname: f_name, 
            lname: l_name, 
            password } = data;

    const location: Location = await prisma.locations.create({
        data: {
            city,
            country,
            state_region,
            zip_postal
        }
    })

    const hashedPassword = await hashPassword(password)

    try {
        const user: User = await prisma.users.create({
            data: {
                location_id: location.location_id,
                f_name,
                l_name,
                fullname: `${f_name} ${l_name}`,
                auth: {
                    create: [{
                        password: hashedPassword
                    }]
                },
                contacts:{
                    create: [{
                        value: email,
                        contact_type: 'email'
                    }]
                }
            }
        });

        return serializer(user);
    } catch(e) {
        await prisma.locations.delete({
            where: {
                location_id: location.location_id
            }
        })
        return e;
    }
};


export const getUser = async (
    query?: any
): Promise<any> => {
        const user: User | null = await prisma.users.findUnique({
            where: {
                user_id: Number(query?.user_id),
            },
            include: {
                locations: true,
                // add certificates and licenses
                contacts: true,
                posts: true
            }
        });
    
        if(!user) throw new HTTPException(404, { message: 'User not found'})
    
        return serializer(user);
    
};
