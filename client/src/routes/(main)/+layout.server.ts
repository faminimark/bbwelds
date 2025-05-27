export const load = async ({ cookies }) => {
    const user_id = cookies.get('user_id');
    const user = user_id ? await (await fetch(`http://localhost:4000/user/${user_id}`)).json(): null
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