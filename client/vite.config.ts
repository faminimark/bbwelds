import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite'
import { wuchale } from 'wuchale'

export default defineConfig({
	server: { port: 3000 },
	plugins: [
		sveltekit(),
		tailwindcss(),
		// wuchale()
	]
});