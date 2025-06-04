import { SERVER_URL } from '$env/static/private';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions = {
	default: async ({ request, fetch, cookies }) => {
        const formData = await request.formData();

        const files = formData.getAll('file') as File[]
        const title = formData.get('title') as string
        const category = formData.get('category') as string
        const description = formData.get('description') as string
        const tag = formData.get('tag') as string
        const user_id = cookies.get('user_id') as string

        // Create new FormData for the node API
        const apiFormData = new FormData();
        files.forEach((file) => {
            apiFormData.append('files', file);
        });

        apiFormData.append('title', title);
        apiFormData.append('category', category);
        apiFormData.append('description', description);
        apiFormData.append('tag', tag);
        apiFormData.append('user_id', user_id);
    
        const response = await fetch(`${SERVER_URL}/post/create`, {
            method: 'POST',
            body: apiFormData,
        });

        const result = await response.json()

        if(result.success){
            redirect(303, '/')
        } else {
            return fail(500, { error: 'Failed to upload files' });
        }

	}
} satisfies Actions

 
