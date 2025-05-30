<script lang="ts">
    let { user_id, created_at, name, img_src } = $props();
    import Avatar from './Avatar.svelte'
</script>

<div class="flex flex-row items-center">
    <Avatar img_src={img_src}/> <a href="/profile/{ user_id }" class="text-[10px] text-gray-500">By { name } at { created_at }</a>
</div>