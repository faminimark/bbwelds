import { SERVER_URL } from '$env/static/private';

export const load = async ({ params, cookies }) => {
    const user_id = cookies.get('user_id') ?? params.id;
    const user = user_id ? await (await fetch(`${SERVER_URL}/user/${user_id}`)).json(): null
    const isLoggedIn = user_id ? true : false
	return { 
        categories: [
            {value: 'weld', displayValue: 'Welding'},
            {value: 'elect', displayValue: 'Electrician'},
            {value: 'automotive', displayValue: 'Automotive'},
            {value: 'construction', displayValue: 'Construction'},
            {value: 'ironworker', displayValue: 'Iron Worker'}
        ], 
        user: user?.data,
        isLoggedIn
    }
};