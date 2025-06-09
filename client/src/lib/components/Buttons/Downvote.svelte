<script lang="ts">
    import { ArrowDownIcon } from 'lucide-svelte'

    let { disliked = false } = $props()
</script>

<button type="submit" class="flex flex-row  items-center gap-3 p-2 { disliked ? 'hover:bg-red-100 text-red-400' : 'hover:bg-gray-100 text-gray-400' } rounded-md cursor-pointer" value="downvote" name='voteAction'><ArrowDownIcon class=" w-5 h-5"/></button>
