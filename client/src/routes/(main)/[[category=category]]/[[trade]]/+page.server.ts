import { SERVER_URL } from '$env/static/private';

export const load = async({ fetch }) => {
	// Add URL params
	const response = await fetch(`${SERVER_URL}/feed`)

	return await response.json()
}