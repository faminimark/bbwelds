import { SERVER_URL } from '$env/static/private';
import { downvote, upvote } from '$lib/service/vote';
import { fail, type Actions } from '@sveltejs/kit';

export const load = async({ fetch, params  }) => {
	const response = await fetch(`${SERVER_URL}/post/${params.id}`);
	return await response.json()
}

export const actions = {
	upvote: async ({ params }) => {
		if(!params.id)  return fail(500, { error: 'You shall not vote' })
		await upvote({
			id: params.id,
			type: 'post'
		})
	},
	downvote: async ({params}) => {
		if(!params.id)  return fail(500, { error: 'You shall not vote' })
		await downvote({
			id: params.id,
			type: 'post'
		})
	}
} satisfies Actions