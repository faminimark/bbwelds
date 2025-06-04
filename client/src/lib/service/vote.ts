import { SERVER_URL } from '$env/static/private';

type VoteInput = {
    type: 'comment' | 'post' | 'user';
    id: string;
    user_id: string;
}

export const upvote = async (input : VoteInput) => {
    const response = await fetch(`${SERVER_URL}/vote/upvote`, {
        method: 'POST',
        body: JSON.stringify(input),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    
    return response
}

export const downvote = async (input : VoteInput) => {
    const response = await fetch(`${SERVER_URL}/vote/downvote`, {
        method: 'POST',
        body: JSON.stringify(input),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    return response
}