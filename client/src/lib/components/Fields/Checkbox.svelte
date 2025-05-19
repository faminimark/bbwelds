<script lang='ts'>
    let { label, name, checked = $bindable() } = $props();
</script>

<label for={name}>
    <input id={name} name={name} type="checkbox" bind:checked />
    {@html label }
</label>