<script lang="ts">
    const { label, Icon = undefined, onclick } = $props()
</script>

<button aria-label={label} onclick={onclick} class="flex gap-2 cursor-pointer font-semibold p-3 text-gray-700 rounded-md  border-gray-700  hover:bg-gray-100">
    {#if Icon}
        <Icon />
    {/if} 
    <span class="max-sm:hidden">{label}</span>
</button>