<script lang="ts">
    let { modal = $bindable(),  submit = $bindable() } = $props()
</script>

<footer>
    <button class="cursor-pointer" onclick={()=> modal.close()}>Cancel</button>
    {#if submit}<button class="cursor-pointer" onclick={submit}>Submit</button> {/if}
</footer>