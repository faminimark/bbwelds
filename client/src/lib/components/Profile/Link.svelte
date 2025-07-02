<script lang="ts">
    import Avatar from './Avatar.svelte'
    import { getRelativeTime } from '$lib/utils';

    let { user_id, name, created_at, img_src } = $props();

    
    const date = new Date(created_at)
    let formattedDate =  getRelativeTime(date)
</script>

<div class="flex flex-col">
    <div class="flex  items-center gap-2">
        <Avatar {img_src} {user_id}/> <a href="/profile/{ user_id }" class="text-lg text-inherit underline"> { name } </a> &#183; {formattedDate}
    </div>
</div>