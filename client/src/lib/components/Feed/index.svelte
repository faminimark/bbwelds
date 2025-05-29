<script>
    import Footer from './Footer.svelte';
    import Title from './Title.svelte';
    import Body from './Body.svelte';

    let { title, description, post_id, created_at, user } = $props()
</script>

<div class="flex flex-col gap-3">
    <Title title={title} post_id={post_id} user={user} created_at={created_at}/>
    <Body description={description} post_id={post_id}/>
    <Footer post_id={post_id}/>
</div>