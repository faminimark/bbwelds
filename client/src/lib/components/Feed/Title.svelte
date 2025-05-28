<script lang="ts">
    import Link from '$lib/components/Profile/Link.svelte'
    import { ShareButton } from '$lib/components/Buttons'
    let {title, post_id, user_id } = $props();
    let created_at = new Date().toDateString()
</script>

<div>
    <div class="flex flex-row items-center justify-between">
        <h2 class="text-xl text-gray-700 font-semibold">{ title }</h2>
        <ShareButton />
    </div>

    <Link user_id="user_id" created_at={created_at}/>
</div>