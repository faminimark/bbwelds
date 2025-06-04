import { SERVER_URL } from '$env/static/private';
import { downvote, upvote } from '$lib/service/vote';
import { fail, type Actions } from '@sveltejs/kit';

export const load = async({ fetch, params  }) => {
	const response = await fetch(`${SERVER_URL}/post/${params.id}`);
	return await response.json()
}

export const actions = {
	upvote: async ({ params, cookies }) => {
		const user_id = cookies.get('user_id') as string
		if(!params.id || !user_id)  return fail(500, { error: 'You shall not vote' })
		
		await upvote({
			id: params.id,
			type: 'post',
			user_id: user_id
		})
	},
	downvote: async ({ params, cookies }) => {
		const user_id = cookies.get('user_id') as string
		if(!params.id || !user_id)  return fail(500, { error: 'You shall not vote' })
		
		await downvote({
			id: params.id,
			type: 'post',
			user_id: user_id
		})
	}
} satisfies Actions