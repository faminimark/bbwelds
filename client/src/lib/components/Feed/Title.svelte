<script lang="ts">
    import Link from '$lib/components/Profile/Link.svelte'
    import { ShareButton } from '$lib/components/Buttons'
    let { title, user, post_id, created_at } = $props();
    const date = new Date(created_at)
    let formattedDate =  `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`
</script>

<div>
    <div class="flex flex-row items-center justify-between">
        <h2 class="text-xl text-gray-700 font-semibold">{ title }</h2>
        <ShareButton />
    </div>

    <Link user_id={user.user_id} created_at={formattedDate} name={user.fullname}/>
</div>