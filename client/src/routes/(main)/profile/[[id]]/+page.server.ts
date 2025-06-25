import { SERVER_URL } from '$env/static/private';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const load = async({ fetch, params  }) => {
	const response = await (await fetch(`${SERVER_URL}/user/${params.id}`)).json()
	return response;
}

export const actions = {
	default: async ({ request, fetch, cookies }) => {
		const formData = await request.formData();
        const data = Object.fromEntries(formData)
		console.log(data)
		const response = await fetch(`${SERVER_URL}/user`, {
			method: 'PUT',
			body: JSON.stringify(data)
		});

		const result = await response.json()

		if(result.success){
			redirect(303, '/')
		} else {
			return fail(500, { error: 'Failed to upload files' });
		}

	}
} satisfies Actions

 