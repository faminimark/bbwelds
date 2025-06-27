import { SERVER_URL } from '$env/static/private';
import { fail, redirect,  } from '@sveltejs/kit';
import type { Actions } from './$types';

export const load = async({ fetch, params  }) => {
	const response = await (await fetch(`${SERVER_URL}/user/${params.id}`)).json()
	return response;
}

export const actions = {
	edit: async ({ request, fetch }) => {
		const formData = await request.formData();
        const data = Object.fromEntries(formData)
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

	},
	uploadImage: async ({request, fetch}) => {
		const formData = await request.formData();
        const files = formData.getAll('file') as File[]
		const apiFormData = new FormData();

        files.forEach((file) => {
            apiFormData.append('files', file);
        });

		const response = await fetch(`${SERVER_URL}/user/upload-image`, {
			method: 'POST',
			body: apiFormData
		});

		const result = await response.json()

        if(result.success){
            return result
        } else {
            return fail(500, { error: 'Failed to upload user image' });
        }

	}
} satisfies Actions

 