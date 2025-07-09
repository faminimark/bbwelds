<script>
    import {WhiteButton} from '$lib/components/Buttons'
    let { children, submit = $bindable(), label = undefined, Icon = undefined, form = undefined } = $props()
    let modal = $state()
</script>

<dialog id="menu" class="hidden w-full max-w-sm m-auto rounded-lg flex-col" bind:this={modal}>
    {@render children()}
    <button type="button" class="p-2 border-t-1 border-gray-300 cursor-pointer text-gray-700 font-semibold text-lg" onclick={() => modal.close()}>Cancel</button>
</dialog>

<WhiteButton {Icon} {label} onclick={() => modal.showModal() } />
<style>
    dialog:open {
        display: flex;
    }
</style>