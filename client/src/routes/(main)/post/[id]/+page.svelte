<script>

    let { data } = $props()
    let { title, description } = data.data;
</script>

<div>
    <h1>{title}</h1>
    <p>{description}</p>
</div>