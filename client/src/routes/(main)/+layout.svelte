<script lang="ts">
    import { setContext } from 'svelte';

    import Nav from '$lib/components/Nav.svelte';
    import Footer from '$lib/components/Footer.svelte';
    let { children, data } = $props();
    import "../../app.css";

	setContext('category', data.data);
</script>


<Nav />
<div class="flex flex-col justify-start gap-20 mx-25 my-5 justify-self-center max-w-[1480px] w-full sm:px-3  min-h-screen">
    {@render children()}
</div>
<Footer />

<style lang="postcss">
    @reference "tailwindcss";
</style>