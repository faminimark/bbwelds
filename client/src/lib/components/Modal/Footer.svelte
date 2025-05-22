<script lang="ts">
    let { modal = $bindable(),  submit = $bindable() } = $props()
</script>

<footer class="absolute bottom-0">
    <button class="cursor-pointer" onclick={()=> modal.close()}>Cancel</button>
</footer>