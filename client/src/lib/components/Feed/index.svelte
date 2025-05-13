<script>
    import Footer from './Footer.svelte';
    import Title from './Title.svelte';
    import Body from './Body.svelte';

    let { title, description} = $props()
</script>

<div class="flex flex-col gap-5">
    <Title title={title}/>
    <Body description={description}/>
    <Footer />
</div>