import { SERVER_URL } from '$env/static/private';

export const load = async ({ cookies }) => {
    const user_id = cookies.get('user_id') ?? undefined;

    const [user, categories] = await Promise.all([
        user_id ? await (await fetch(`${SERVER_URL}/user/${user_id}`)).json(): null, 
        await (await fetch(`${SERVER_URL}/category`)).json(), 
    ])
    
    const isLoggedIn = user_id ? true : false
    
	return { 
        categories: categories.data, 
        user: user?.data,
        isLoggedIn
    }
};