import { PrismaClient, $Enums } from '@prisma/client'
const prisma = new PrismaClient();

type AddCommentInput = {
    id: string;
    user_id: string;
    comment: string;
}

type AddCommentOutput = { 
    comment: string | null;
    user_id: string | null;
    comment_id: string;
    post_id: string | null;
    comment_type: $Enums.comment_type;
}

export const addComment = async (
    { comment, id, user_id }: AddCommentInput
): Promise<AddCommentOutput> => {
    
    return await prisma.comments.create({data: {
        comment,
        post_id: id,
        user_id: user_id,
        comment_type: 'post'
    }})
};