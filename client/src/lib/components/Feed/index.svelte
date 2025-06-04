<script>
    import Footer from './Footer.svelte';
    import Title from './Title.svelte';
    import Body from './Body.svelte';

    let { images, votes = undefined, variant = 'default', ...rest } = $props()
    let { title, post_id, users, created_at, description } = rest
</script>

<div class="flex flex-col gap-3">
    <Title title={title} post_id={post_id} user={users} created_at={created_at}/>
    <Body description={description} post_id={post_id} images={images} variant={variant}/>
    {#if variant === 'default'}<Footer post_id={post_id} votes={votes}/>{/if}
</div>