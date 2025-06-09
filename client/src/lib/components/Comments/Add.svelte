<script lang="ts">
    import { Send } from 'lucide-svelte';
    import { TextArea } from '$lib/components/Fields'
    import { enhance } from '$app/forms';

    let open = $state(false);
</script>

<form class="flex flex-col gap-4" method="POST" action="?/addComment" use:enhance>
    {#if open}
        <TextArea placeholder="Add comment..." name="add-comment" shouldFocus={open}/>
        <div class="flex gap-4 self-end">
            <button onclick={() => open = false } class='hover:bg-gray-100 p-2 font-semibold cursor-pointer rounded-sm'>
                Cancel
            </button>
            <button type="submit" class='bg-teal-400 text-white hover:bg-teal-300 p-2 cursor-pointer rounded-sm'>
                <Send size="20"/>
            </button>
        </div>
    {:else}
        <button onclick={() => { open = true }} class="flex border-1 border-gray-300 p-4 rounded-sm text-gray-400"> Add comment... </button>
    {/if}
</form>