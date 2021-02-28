import App from './App.svelte';

const app = new App({
	target: document.body,
	props: {
		name: 'Your Name Here'
	},
	accessors: true
});

export default app;