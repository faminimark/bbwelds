<script lang="ts">
    let { placeholder, max = undefined, name } = $props();
</script>

<label for={name} class="min-w-[280px] border-1 border-gray-300 rounded-md relative">
    <input name={name}  placeholder={placeholder} class="w-full p-4" />
    
    {#if max}
    <div class="absolute right-0 top-0 px-4 border-l-gray-300 border-l-1 h-full text-gray-600 pt-4">
        {max}
    </div>
    {/if}
</label>