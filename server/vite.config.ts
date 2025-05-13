import { defineConfig } from 'vite';
import devServer from '@hono/vite-dev-server';
import nodeAdapter from '@hono/vite-dev-server/node';
import hono from '@hono/vite-build/node';


const entry = './src/index.ts'
export default defineConfig({
    server: {port: 4000},
	plugins: [
		devServer({adapter: nodeAdapter, entry }),
		hono()
	]
});