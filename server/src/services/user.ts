import { HTTPException } from 'hono/http-exception'
import { PrismaClient, posts as Posts, users as Users } from '@prisma/client'
import { serializer } from '../utils';
const prisma = new PrismaClient();

type PostInput = {
    post_id: string
}

// export const createUser = async (
//     query?: PostInput
//   ): Promise<Users> => {
//     // const user: Users | null = await prisma.users.create({
//     //     where: {
//     //         post_id: Number(query?.post_id)
//     //     }
//     // });
//     // // TODO: Add entry to post_tags and category
//     // const posts: Posts[] = await prisma.$queryRaw<Posts[]>`
//     // select * from posts
//     // `

//     // if(!posts) throw new HTTPException(404, { message: 'Post not found'})
   
//     // return serializer(posts);
//   };
