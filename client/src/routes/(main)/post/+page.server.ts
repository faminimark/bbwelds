import { SERVER_URL } from '$env/static/private';
import { fail } from '@sveltejs/kit';
 import type { Actions } from './$types';

export const actions = {
	default: async ({ request, fetch }) => {
        const formData = await request.formData();

        const files = formData.getAll('file') as File[]
        const title = formData.get('title') as string
        const category = formData.get('category') as string
        const description = formData.get('description') as string
        const tag = formData.get('tag') as string

        try {
        // Create new FormData for the node API
        const apiFormData = new FormData();
        files.forEach((file) => {
            apiFormData.append('files', file);
        });

        apiFormData.append('title', title);
        apiFormData.append('category', category);
        apiFormData.append('description', description);
        apiFormData.append('tag', tag);
    
        const response = await fetch(`${SERVER_URL}/post/create`, {
                method: 'POST',
                body: apiFormData,
            });

        const result = await response.json();
        return { success: true, data: result };
        
		} catch (err) {
            return fail(500, { error: 'Failed to upload files' });
        }
	}
} satisfies Actions

 
