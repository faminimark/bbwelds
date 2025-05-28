<script lang="ts">
    import "../../app.css";

    import Nav from '$lib/components/Nav.svelte';
    import Footer from '$lib/components/Footer.svelte';

    let { children, data } = $props();
    let  isLoggedIn  = data.isLoggedIn
</script>

<svelte:head>
    <title>Build Bard - Every Build Tells a Story</title> 
</svelte:head>

<Nav isLoggedIn={isLoggedIn}/>
<main class="flex flex-col justify-start gap-20 max-md:mx-25 my-5 justify-self-center max-w-[1480px] w-full sm:px-3  min-h-screen">
    {@render children()}
</main>
<Footer />

<style lang="postcss">
    @reference "tailwindcss";
</style>