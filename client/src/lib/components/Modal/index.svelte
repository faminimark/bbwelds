<script>
    import Footer from './Footer.svelte';
    import Header from './Header.svelte';

    let { children, title = undefined, submit = $bindable(), label } = $props()
    let modal = $state()
</script>

<dialog id="modal" class="hidden w-full max-w-3xl min-h-1/3 m-auto p-5" bind:this={modal}>
    <div class="flex flex-col gap-5 h-full ">
        <Header title={title} modal={modal}/>
        <div>
            {@render children()}
        </div>
        <Footer submit={submit} modal={modal}/>
    </div>
</dialog>

<button aria-label="open modal" onclick={() => modal.showModal() }>{label}</button>

<style>
    dialog:open {
        display: block;
    }
</style>