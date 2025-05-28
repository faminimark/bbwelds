<script lang="ts">
    import { MessageSquare } from 'lucide-svelte'
    import { DownvoteButton, UpvoteButton } from '$lib/components/Buttons'
    let { post_id } = $props();
</script>

<div class="flex flex-row gap-4">
    <DownvoteButton />
    <UpvoteButton />
    <a href={`/post/${post_id}#comment`} class="flex flex-row  items-center gap-3 p-2 hover:bg-gray-100 rounded-md text-gray-400"><MessageSquare class="w-5 h-5"/> 55 comments</a>
</div>