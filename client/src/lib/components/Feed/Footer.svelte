<script lang="ts">
    import { ArrowUpIcon, ArrowDownIcon, ChatBubbleLeftIcon } from 'heroicons-svelte/24/outline'
    let { post_id } = $props();
</script>

<div class="flex flex-row gap-4">
    <!-- TODO: split component -->
    <button type="button" class="flex flex-row  items-center gap-3 p-2 hover:bg-gray-100 rounded-md text-gray-400 font-semibold"><ArrowUpIcon class=" w-5 h-5"/> 25</button>
    <button type="button" class="flex flex-row  items-center gap-3 p-2 hover:bg-gray-100 rounded-md text-gray-400 font-semibold"><ArrowDownIcon class=" w-5 h-5"/></button>
    <a href={`/post/${post_id}#comment`} class="flex flex-row  items-center gap-3 p-2 hover:bg-gray-100 rounded-md text-gray-400 font-semibold"><ChatBubbleLeftIcon class="w-5 h-5"/> 55 comments</a>
</div>