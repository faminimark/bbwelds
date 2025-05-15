export const load = async({ fetch, params  }) => {
	//TODO: make the url source fetch from Secrets manager
	const response = await fetch(`http://localhost:4000/post/${params.id}`);
	return await response.json()
}