import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/kit/vite';

const dev = process.argv.includes('dev');
const repoName = 'Personal_Website'; // Your GitHub repository name
const base = dev ? '' : `/${repoName}`;

/** @type {import('@sveltejs/kit').Config} */
const config = {
    preprocess: vitePreprocess(),
    kit: {
        adapter: adapter({ 
            fallback: 'index.html',
            precompress: false
        }),
        paths: {
            base: base, // Set base path explicitly
        },
        prerender: {
            handleHttpError: 'warn',
        },
    },
};

export default config;