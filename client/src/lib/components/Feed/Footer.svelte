<script lang="ts">
    import { MessageSquare } from 'lucide-svelte'
    import { DownvoteButton, UpvoteButton } from '$lib/components/Buttons'
  import { enhance } from '$app/forms';
    let { post_id, votes = undefined } = $props();

</script>

<div class="flex flex-row gap-4">
    <form class="flex" method="POST" action="?/vote" use:enhance>
        <UpvoteButton count={votes?.upvote}/>
        <DownvoteButton />
        <input name="post_id" class="hidden" value={post_id}>
    </form>
    <a href={`/post/${post_id}#comment`} class="flex flex-row  items-center gap-3 p-2 hover:bg-gray-100 rounded-md text-gray-400"><MessageSquare class="w-5 h-5"/> 55 <span class="max-md:hidden">comments</span></a>
</div>