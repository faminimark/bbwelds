import { HTTPException } from 'hono/http-exception'
import { PrismaClient, posts as Posts } from '@prisma/client'
import { serializer } from '../utils';
const prisma = new PrismaClient();

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
            users: true
        }
    });

    if(!posts) throw new HTTPException(404, { message: 'Post not found'})

    return serializer(posts);
};

export const createPost = async (
    query?: any //fix this type after formData
): Promise<Posts> => {
    const posts: Posts | null = await prisma.posts.create({

    });

    if(!posts) throw new HTTPException(404, { message: 'Post not found'})

    return serializer(posts);
};
