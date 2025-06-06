<script lang="ts">
    import { ArrowUpIcon } from 'lucide-svelte'

    let { count } = $props()
</script>

<button type="submit" class="flex flex-row  items-center gap-3 p-2 hover:bg-gray-100 rounded-md text-gray-400 cursor-pointer" value="upvote" name='voteAction'><ArrowUpIcon class=" w-5 h-5"/> { Boolean(count) ? count : ''}</button>
