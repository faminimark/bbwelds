import { PrismaClient, image_type, vote_type } from '@prisma/client'
import { useId } from 'hono/jsx';

const prisma = new PrismaClient();

type VoteInput = {
    id: string | number;
    type: image_type; 
    user_id: string;
    vote_type: vote_type;
}

const hadVoted = (voted: boolean, vote_type: vote_type, user_vote_id: number, user_id: number) => {
    if(voted) {
        return {
                [vote_type ? 'upvote' : 'downvote']: { decrement: 1 },
                user_votes: {
                    delete: {
                        user_vote_id
                    }
                }
            }
    }
    
    return {
        [vote_type ? 'upvote' : 'downvote']: { increment: 1 },
        user_votes: {
            create: {
                vote_type,
                user_id: Number(user_id)
            }
        }
    }
}


export const vote = async (
    { id, type, user_id, vote_type }: VoteInput
): Promise<{success: boolean}> => {
    const userId = Number(user_id)

    const vote = await prisma.votes.findFirst({
        where: {
            voteable_id: Number(id),
            voteable_type : type as image_type,
        },
        include: {
            user_votes: {
                where: {
                    user_id: userId,
                    votes : {
                        voteable_id: Number(id),
                        voteable_type : type as image_type,
                    }
                }
            }
        }
    });

    if(!vote) {
        await prisma.votes.create({
            data: {
                voteable_id: Number(id),
                voteable_type : type as image_type,
                upvote: vote_type === 'upvote' ? 1 : 0,
                downvote: vote_type === 'downvote' ? 1 : 0,
                user_votes: {
                    create: {
                        vote_type,
                        user_id: userId
                    }
                }
            }
        })
    } else {
        const user_vote_id =  vote?.user_votes[0]?.user_vote_id
        const voted = Boolean(vote?.user_votes.length && user_vote_id)
        const didVote = hadVoted(voted, vote_type, user_vote_id, userId) 
            
        await prisma.votes.update({
            where: {
                vote_id: vote.vote_id,
            },
            data: didVote
        })
    }

    return { success: true };
};