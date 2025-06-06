<script lang="ts">
    import { ArrowUpIcon } from 'lucide-svelte'

    let { count, liked = false } = $props()
</script>

<button type="submit" class="flex flex-row  items-center gap-3 p-2 { liked ? 'hover:bg-blue-100 text-blue-400' : 'hover:bg-gray-100 text-gray-400' }  rounded-md  cursor-pointer" value="upvote" name='voteAction'><ArrowUpIcon class=" w-5 h-5"/> { Boolean(count) ? count : ''}</button>
