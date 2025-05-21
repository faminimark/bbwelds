import { HTTPException } from 'hono/http-exception'
import { PrismaClient, posts as Posts } from '@prisma/client'
import { serializer } from '../utils';
const prisma = new PrismaClient();

type PostInput = {
    post_id: string
}

export const getPost = async (
    query?: PostInput
): Promise<Posts> => {
    const posts: Posts | null = await prisma.posts.findUnique({
        where: {
            post_id: Number(query?.post_id)
        }
    });

    if(!posts) throw new HTTPException(404, { message: 'Post not found'})

    return serializer(posts);
};
