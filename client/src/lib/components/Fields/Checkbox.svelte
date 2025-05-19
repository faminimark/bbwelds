<script lang='ts'>
    let { label, name} = $props();
</script>

<label for={name}>
    <input id={name} name={name} type="checkbox"/>
    {@html label }
</label>