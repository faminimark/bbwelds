import { SERVER_URL } from "$env/static/private";
import { fail, redirect, type Actions } from "@sveltejs/kit";

export const actions = {
    default: async ({ request, fetch, cookies }) => {

        const formData = await request.formData();
        const data = Object.fromEntries(formData)

        const response = await fetch(`${SERVER_URL}/auth/login`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json' 
            }
        });

        const result = await response.json();

         if(result.verified) {
            const expires = new Date()
            const expiration = new Date(expires);
            expiration.setDate(expiration.getDate() + 60);

            cookies.set('auth-token', result.token, { expires: expiration, path: "/"})
            cookies.set('user_id', result.user_id, { expires: expiration,  path: "/"})
            // NOTE: 303 for post, 300 for get
            redirect(303, '/')
        } else {
            return fail(400, { success: false, message: result.error });
        }
    }
} satisfies Actions
