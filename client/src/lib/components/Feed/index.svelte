<script lang="ts">
    import Footer from './Footer.svelte';
    import Body from './Body.svelte';
    import Description from './Description.svelte';
    let { images, votes = undefined, variant = 'default', ...rest } = $props()
    let { title, post_id, users: user, created_at, description, _count, profile_image, post_tags } = rest
</script>

<div class="flex flex-col gap-3 bg-white">
    <div class="relative">
        <Body  {post_id} {images} {title} {user} {created_at} {profile_image}/>
    </div>
    <Description {description} {post_tags} />
    <Footer {post_id} {votes} comment_count={_count.comments}/>
</div>