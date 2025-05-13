<script lang="ts">
    import { ArrowUpIcon, ArrowDownIcon, ChatBubbleLeftIcon, ShareIcon } from 'heroicons-svelte/24/outline'
</script>

<div class="flex flex-row gap-4">
    <!-- TODO: split component -->
    <button type="button" class="flex flex-row gap-3 p-2 hover:bg-gray-100 rounded-md text-gray-400"><ArrowUpIcon class=" w-5 h-5"/> 25</button>
    <button type="button" class="flex flex-row gap-3 p-2 hover:bg-gray-100 rounded-md text-gray-400"><ArrowDownIcon class=" w-5 h-5"/></button>
    <button type="button" class="flex flex-row gap-3 p-2 hover:bg-gray-100 rounded-md text-gray-400"><ChatBubbleLeftIcon class="w-5 h-5 "/> 55 comments</button>

</div>