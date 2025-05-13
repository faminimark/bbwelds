export const load = async({ fetch }) => {
	//TODO: make the url source fetch from Secrets manager
	const response = await fetch('http://localhost:4000/feed');

	return await response.json()
}