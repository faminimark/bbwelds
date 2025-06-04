import { SERVER_URL } from '$env/static/private';
import { downvote, upvote } from '$lib/service/vote';
import { fail, type Actions } from '@sveltejs/kit';

export const load = async({ fetch }) => {
	const response = await fetch(`${SERVER_URL}/feed`)

	return await response.json()
}

export const actions = {
	upvote: async ({ cookies, request }) => {
		const form = await request.formData()
		const post_id = form.get('post_id') as string

		const user_id = cookies.get('user_id') as string
		if(!post_id || !user_id)  return fail(500, { error: 'You shall not vote' })
		
		await upvote({
			id: post_id,
			type: 'post',
			user_id: user_id
		})
	},
	downvote: async ({ cookies, request }) => {
		const form = await request.formData()
		const post_id = form.get('post_id') as string
		const user_id = cookies.get('user_id') as string
		if(!post_id || !user_id)  return fail(500, { error: 'You shall not vote' })
		
		await downvote({
			id: post_id,
			type: 'post',
			user_id: user_id
		})
	}
} satisfies Actions