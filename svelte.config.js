import adapter from '@sveltejs/adapter-static';

// Explicitly set the repository name for GitHub Pages
const dev = process.argv.includes('dev');
const base = dev ? '' : '/PersonalWebsite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
    kit: {
        adapter: adapter({ fallback: '404.html' }),
        paths: {
            base: base,  // Use the explicit base path
        },
    },
};

export default config;