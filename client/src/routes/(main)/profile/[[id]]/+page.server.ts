import { SERVER_URL } from '$env/static/private';

export const load = async({ fetch, params  }) => {
	const response = await (await fetch(`${SERVER_URL}/user/${params.id}`)).json()
	return response;
}