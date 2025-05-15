<script>
    import Footer from './Footer.svelte';
    import Title from './Title.svelte';
    import Body from './Body.svelte';

    let { title, description, post_id} = $props()
</script>

<div class="flex flex-col gap-3">
    <Title title={title}/>
    <Body description={description} post_id={post_id}/>
    <Footer post_id={post_id}/>
</div>