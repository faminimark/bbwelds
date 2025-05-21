import { HTTPException } from 'hono/http-exception'
import { PrismaClient, locations as Locations, users as Users } from '@prisma/client'
import { serializer } from '../utils';
const prisma = new PrismaClient();

type PostInput = {
    post_id: string
}

export const createUser = async (
    data?: any
  ): Promise<any> => {
    const {city, country, state: state_region, zip: zip_postal, email, fname: f_name, lname: l_name} = data;
    const location = await prisma.locations.create({
        data: {
            city,
            country,
            state_region,
            zip_postal
        }
    })

    try {
        const user = await prisma.users.create({
            data: {
                location_id: location.location_id,
                email,
                f_name,
                l_name,
                fullname: `${f_name} ${l_name}`
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
