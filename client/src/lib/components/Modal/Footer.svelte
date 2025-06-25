<script lang="ts">
    let { modal = $bindable(),  submit = $bindable(), type = undefined, form = undefined } = $props()
</script>

<footer class="flex justify-between">
    <button class="cursor-pointer" onclick={()=> modal.close()} >Cancel</button>
    {#if submit || type}<button class="px-[9px] py-[5px] cursor-pointer rounded-sm bg-blue-500 text-white font-semibold" onclick={submit} {type} {form}>Submit</button> {/if}
</footer>