<script lang="ts">
    let { user_id, name, created_at, img_src } = $props();
    import Avatar from './Avatar.svelte'
</script>

<div class="flex flex-col">
    <div class="flex  items-center gap-2">
        <Avatar {img_src} {user_id}/> <a href="/profile/{ user_id }" class="text-lg text-inherit underline"> { name } </a> &#183; {created_at}
    </div>
</div>