import { PrismaClient, $Enums } from '@prisma/client'
const prisma = new PrismaClient();

type AddCommentInput = {
    id: string;
    user_id: string;
    comment: string;
}

type AddCommentOutput = { 
    comment: string | null;
    user_id: number | null;
    comment_id: number;
    post_id: number | null;
    vote_id: number | null;
    comment_type: $Enums.comment_type;
}

export const addComment = async (
    { comment, id, user_id }: AddCommentInput
): Promise<AddCommentOutput> => {
    
    return await prisma.comments.create({data: {
        comment,
        post_id: Number(id),
        user_id: Number(user_id),
        comment_type: 'post'
    }})
};