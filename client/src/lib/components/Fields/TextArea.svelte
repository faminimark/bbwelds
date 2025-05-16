<script lang="ts">
    let { placeholder, max = undefined, name } = $props();
</script>

<label for={name} class="min-w-[280px] flex border-1 border-gray-300 rounded-md relative">
    <textarea id={name} placeholder={placeholder} class="w-full p-4" rows="2" maxlength={max} ></textarea>
    
    {#if max}
    <div class="absolute right-0 top-0 px-4 border-l-gray-300 border-l-1 h-full text-gray-600 pt-8">
        {max}
    </div>
    {/if}
</label>