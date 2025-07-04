import { SERVER_URL } from '$env/static/private';

export const load = async ({ cookies }) => {
    const user_id = cookies.get('user_id') ?? undefined;

    const user = user_id ? await (await fetch(`${SERVER_URL}/user/${user_id}`)).json(): null
    
    const isLoggedIn = user_id ? true : false
    
	return { 
        user: user?.data,
        isLoggedIn
    }
};