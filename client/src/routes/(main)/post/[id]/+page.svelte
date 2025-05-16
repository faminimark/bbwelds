<script>

    let { data } = $props()
    let { title, description } = data.data;
</script>

<div>
    <h1>{title}</h1>
    <img aria-label="feed" alt="feed" src="https://picsum.photos/400" class="max-h-380px "/>
    <p>{description}</p>

    <div id="comment">
        <!-- fix this later -->
    </div>
</div>