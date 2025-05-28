<script>
    let { description, post_id } = $props()
</script>

<div class="flex flex-col min-w-280px">
    <a href={`/post/${post_id}`} class="flex justify-center bg-gray-100">
        <img aria-label="feed" alt="feed" src="https://picsum.photos/400" class="max-h-380px"/>
    </a>
    <div class="my-5">
        <desc class="text-sm font-light text-gray-400">{description}</desc>
    </div>
    <div class="flex gap-2 flex-wrap">
        <!-- Clickable and filter to a sub-feed with only those tags -->
        <span class="text-xs font-semibold text-gray-400 border-1 rounded-sm p-2">bbwelds</span>
        <span class="text-xs font-semibold text-gray-400 border-1 rounded-sm p-2">hds</span>
        <span class="text-xs font-semibold text-gray-400 border-1 rounded-sm p-2">advice</span>
        <span class="text-xs font-semibold text-gray-400 border-1 rounded-sm p-2">please</span>
        <span class="text-xs font-semibold text-gray-400 border-1 rounded-sm p-2">taginess</span>
    </div>
</div>