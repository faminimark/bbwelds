<script lang='ts'>
    let { title, value} = $props();
</script>


<div class="grid grid-cols-2 gap-4 text-sm">
    <div class="font-semibold col-span-1">
        { title }
    </div>
    {#if typeof value === 'string'}
    <div class="text-gray-500 col-span-1">
        { value }
    </div>
    {:else}
        <ul class="flex flex-col text-gray-500 col-span-1">
            {#each value as val}
                <li>{val}</li>
            {/each}
        </ul> 
    {/if}
</div>
