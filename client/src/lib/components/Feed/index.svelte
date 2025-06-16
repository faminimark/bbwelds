<script>
    import Footer from './Footer.svelte';
    import Title from './Title.svelte';
    import Body from './Body.svelte';

    let { images, votes = undefined, variant = 'default', ...rest } = $props()
    let { title, post_id, users: user, created_at, description, _count, profile_image } = rest
</script>

<div class="flex flex-col gap-3">
    <Title {title} {post_id} {user} {created_at} {profile_image}/>
    <Body {description} {post_id} {images} {variant}/>
    {#if variant === 'default'}<Footer {post_id} {votes} comment_count={_count.comments}/>{/if}
</div>