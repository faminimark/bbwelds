<script lang="ts">
    let { children } = $props();
    import "../../app.css";
</script>

<svelte:head>
    <title>Build Bard - Login to show us your build</title> 
</svelte:head>

{@render children()}

<style lang="postcss">
    @reference "tailwindcss";
</style>