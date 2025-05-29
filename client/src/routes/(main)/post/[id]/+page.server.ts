import { SERVER_URL } from '$env/static/private';

export const load = async({ fetch, params  }) => {
	const response = await fetch(`${SERVER_URL}/post/${params.id}`);
	return await response.json()
}