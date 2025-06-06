<script lang="ts">
    import { ArrowDownIcon } from 'lucide-svelte'

    let { liked = false } = $props()
</script>

<button type="submit" class="flex flex-row  items-center gap-3 p-2 { liked ? 'hover:bg-blue-100 text-black-400' : 'hover:bg-gray-100 text-gray-400' } rounded-md cursor-pointer" value="downvote" name='voteAction'><ArrowDownIcon class=" w-5 h-5"/></button>
