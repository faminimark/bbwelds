export const load = async({ fetch }) => {
	// Add URL params
	const response = await fetch(`http://localhost:4000/feed`)

	return await response.json()
}