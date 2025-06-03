import { PrismaClient, image_type } from '@prisma/client'
import { HTTPException } from 'hono/http-exception';

const prisma = new PrismaClient();

export const upvote = async (
    { id, type }: {id: string | number, type: image_type}
): Promise<{success: boolean}> => {
    const vote = await prisma.votes.findFirst({
        where: {
            voteable_id: Number(id),
            voteable_type : type as image_type
        },
    });

    if(!vote) {
        await prisma.votes.create({
            data: {
                voteable_id: Number(id),
                voteable_type : type as image_type,
                upvote: 1,
                downvote: 0
            }
        })
    } else {
        await prisma.votes.update({
            where: {
                vote_id: vote.vote_id,
            },
            data: {
                upvote: {
                    increment: 1
                }
            }
        })
    }

    return { success: true };
};

export const downvote = async (
    { id, type }: {id: string | number, type: image_type}
): Promise<{success: boolean}> => {
    const vote = await prisma.votes.findFirst({
        where: {
            voteable_id: Number(id),
            voteable_type : type as image_type
        },
    });

    if(!vote) {
        await prisma.votes.create({
            data: {
                voteable_id: Number(id),
                voteable_type : type as image_type,
                downvote: 1,
                upvote: 0
            }
        })
    } else {
        await prisma.votes.update({
            where: {
                vote_id: vote.vote_id,
            },
            data: {
                downvote: {
                    increment: 1
                }
            }
        })
    }

    return { success: true };
};