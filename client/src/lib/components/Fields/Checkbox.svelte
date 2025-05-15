<script lang='ts'>
    let { label, name} = $props();
</script>

<label for={name}>
    <input id={name} type="checkbox"/>
    { label }
</label>