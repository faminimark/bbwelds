<script lang="ts">
    let { placeholder, max = undefined, name, type = undefined, required = undefined, error = $bindable(), value = undefined } = $props();
    import { Eye, EyeClosedIcon } from 'lucide-svelte';
    let showHide =  $state(type);

</script>

<label for={name} class="min-w-[280px] flex w-full border-1 border-gray-300 rounded-md relative bg-white">
    <input id={name} {name} {placeholder} class="w-full p-4" type={showHide} {required} {value}/>
    
    {#if max}
    <div class="absolute right-0 top-0 px-4 border-l-gray-300 border-l-1 h-full text-gray-600 pt-4">
        {max}
    </div>
    {/if}
     {#if type === 'password'}
    <div class="absolute right-0 top-0 px-4 border-l-gray-300 border-l-1 h-full text-gray-600 pt-4">
        <button type="button" onclick={() => {
             showHide = showHide === 'password' ? undefined : 'password' 
        }} class="cursor-pointer">
        {#if showHide === 'password'}
             <Eye />
        {:else}
            <EyeClosedIcon/>
        {/if}
        </button>
    </div>
    {/if}
</label>

{#if error}
<span class='text-red-500 text-xs' >{error}</span>
{/if}