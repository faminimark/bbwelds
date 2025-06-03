import { SERVER_URL } from "$env/static/private";
import { fail, redirect, type Actions } from "@sveltejs/kit";
import { validateEmail } from '$lib/utils'
export const actions = {
    default: async ({ request, fetch }) => {

        const formData = await request.formData();
        const email = formData.get('email') as string
        const password = formData.get('password') as string
        const confirmPassword = formData.get('confirm-password') as string

        if(!email || !password || !confirmPassword) return fail(400, { success: false, message: 'Email, password and confirm password is required' });
        if(validateEmail(email)) return fail(400, { success: false, message: 'Email format is incorrect' });
        if(password !== confirmPassword) return fail(400, { success: false, message: 'Password and confirm password doesn\'t match' });
       
        const data = Object.fromEntries(formData)

        const response = await fetch(`${SERVER_URL}/user/create`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json' 
            }
        });

        const result = await response.json();
         if(result.success) {
            redirect(303, '/login')
        } else {
            if(result.error.code === 'P2002'){
                return fail(400, { success: false, message: 'User is already registered' });
            } else if(result.error.code === 'P2004'){
                return fail(400, { success: false, message: 'Internal service error' });
            }
            
        }
    }
} satisfies Actions
