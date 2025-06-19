<script>
    import Footer from './Footer.svelte';
    import Header from './Header.svelte';

    let { children, title = undefined, submit = $bindable(), label } = $props()
    let modal = $state()
</script>

<dialog id="modal" class="hidden w-full max-w-5xl min-h-1/3 m-auto p-5 rounded-sm flex-col gap-5 " bind:this={modal}>
    <Header title={title} modal={modal}/>
    <div class="overflow-auto">
    {@render children()}
    </div>
    <Footer submit={submit} modal={modal}/>
</dialog>

<button aria-label="open modal" onclick={() => modal.showModal() }>{label}</button>

<style>
    dialog:open {
        display: flex;
    }
</style>