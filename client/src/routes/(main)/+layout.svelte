<script lang="ts">
    import Nav from '$lib/components/Nav.svelte';
    import Footer from '$lib/components/Footer.svelte';
    let { children } = $props();
    import "../../app.css";
</script>


<Nav />
<div class="flex flex-col justify-start gap-20 mx-25 my-5 min-h-screen justify-self-center max-w-[1480px] w-full sm:px-3">
    {@render children()}
</div>
<Footer />

<style lang="postcss">
    @reference "tailwindcss";
</style>