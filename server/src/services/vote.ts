import { PrismaClient, image_type, vote_type } from '@prisma/client'

const prisma = new PrismaClient();

type VoteInput = {
    id: string;
    type: image_type; 
    user_id: string;
    vote_type: vote_type;
}

const hadVoted = (voted: boolean, vote_type: vote_type, user_vote_id: string, user_id: string) => {
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
                user_id
            }
        }
    }
}


export const vote = async (
    { id, type, user_id, vote_type }: VoteInput
): Promise<{success: boolean}> => {

    const vote = await prisma.votes.findFirst({
        where: {
            voteable_id: id,
            voteable_type : type as image_type,
        },
        include: {
            user_votes: {
                where: {
                    user_id,
                    votes : {
                        voteable_id: id,
                        voteable_type : type as image_type,
                    }
                }
            }
        }
    });

    if(!vote) {
        await prisma.votes.create({
            data: {
                voteable_id: id,
                voteable_type : type as image_type,
                upvote: vote_type === 'upvote' ? 1 : 0,
                downvote: vote_type === 'downvote' ? 1 : 0,
                user_votes: {
                    create: {
                        vote_type,
                        user_id
                    }
                }
            }
        })
    } else {
        const user_vote_id =  vote?.user_votes[0]?.user_vote_id
        const voted = Boolean(vote?.user_votes.length && user_vote_id)
        const data = hadVoted(voted, vote_type, user_vote_id, user_id) 
            
        await prisma.votes.update({
            where: {
                vote_id: vote.vote_id,
            },
            data
        })
    }

    return { success: true };
};