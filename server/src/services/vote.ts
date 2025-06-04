import { PrismaClient, image_type } from '@prisma/client'

const prisma = new PrismaClient();

type VoteInput = {
    id: string | number;
    type: image_type; 
    user_id: string;
}

export const upvote = async (
    { id, type, user_id }: VoteInput
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
                downvote: 0,
                user_votes: {
                    create: {
                        vote_type: 'upvote',
                        user_id: Number(user_id)
                    }
                }
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
                },
                user_votes: {
                    create: {
                        vote_type: 'upvote',
                        user_id: Number(user_id)
                    }
                }
            }
        })
    }

    return { success: true };
};

export const downvote = async (
    { id, type, user_id }: VoteInput
): Promise<{success: boolean}> => {
    const vote = await prisma.votes.findFirst({
        where: {
            voteable_id: Number(id),
            voteable_type : type as image_type,
            user_votes: {
                some: {
                    user_id: Number(user_id)
                }
            }
        },
    });

    if(!vote) {
        await prisma.votes.create({
            data: {
                voteable_id: Number(id),
                voteable_type : type as image_type,
                downvote: 1,
                upvote: 0,
                user_votes: {
                    create: {
                        vote_type: 'downvote',
                        user_id: Number(user_id)
                    }
                }
            }
        })
    } else {
        await prisma.votes.update({
            where: {
                vote_id: vote.vote_id      
            },
            data: {
                downvote: {
                    increment: 1
                },
                user_votes: {
                    create: {
                        vote_type: 'downvote',
                        user_id: Number(user_id)
                    }
                }
            }
        })
    }

    return { success: true };
};