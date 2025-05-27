<script lang="ts">
    import { setContext } from 'svelte';
    import { browser } from '$app/environment'; 

    import Nav from '$lib/components/Nav.svelte';
    import Footer from '$lib/components/Footer.svelte';

    let { children, data } = $props();
    import "../../app.css";
	setContext('category', data.data as { displayValue: string; value: string; }[]);

    if (browser) {
        setContext('isLoggedIn', localStorage?.getItem('auth-token') ? true : false);
    }
</script>

<svelte:head>
    <title>Build Bard - Every Build Tells a Story</title> 
</svelte:head>

<Nav />
<main class="flex flex-col justify-start gap-20 mx-25 my-5 justify-self-center max-w-[1480px] w-full sm:px-3  min-h-screen">
    {@render children()}
</main>
<Footer />

<style lang="postcss">
    @reference "tailwindcss";
</style>