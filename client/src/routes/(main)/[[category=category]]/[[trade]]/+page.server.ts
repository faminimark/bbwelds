import { SERVER_URL } from '$env/static/private';
import { fail, type Actions } from '@sveltejs/kit';

export const load = async({ fetch }) => {
	const response = await fetch(`${SERVER_URL}/feed`)

	return await response.json()
}

export const actions = {
	vote: async ({fetch, request, cookies}) => {
		const form = await request.formData()
		const post_id = form.get('post_id') as string
		const vote_type = form.get('voteAction') as string	
		const user_id = cookies.get('user_id') as string
		if(!post_id || !user_id)  return fail(500, { error: 'You shall not vote' })
		
		const response = await fetch(`${SERVER_URL}/vote`, {
			method: 'POST',
			body: JSON.stringify({
				id: post_id,
				type: 'post',
				user_id: user_id,
				vote_type
			}),
			headers: {
				'Content-Type': 'application/json'
			}
		});

	}
} satisfies Actions