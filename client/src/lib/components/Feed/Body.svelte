<script lang="ts">
    import Carousel from '$lib/components/Carousel.svelte'
    let { description, post_id, images, variant } = $props()
</script>

<div class="flex flex-col min-w-280px">
    <Carousel image_count={images.length} >
        {#each images as image}
            <a href="/post/{post_id}" class="embla__slide w-full flex shrink-0 grow-0 basis-full">
                <img aria-label="feed" alt="feed" src={image.image_url}  />
            </a>
        {/each}
    </Carousel>
    <div class="my-5">
        <desc class="text-sm font-light text-gray-400">{description}</desc>
    </div>
    {#if variant === 'default'}
    <div class="flex gap-2 flex-wrap">
        <!-- Clickable and filter to a sub-feed with only those tags -->
        <span class="text-xs font-semibold text-gray-400 border-1 rounded-sm p-2">bbwelds</span>
        <span class="text-xs font-semibold text-gray-400 border-1 rounded-sm p-2">hds</span>
        <span class="text-xs font-semibold text-gray-400 border-1 rounded-sm p-2">advice</span>
        <span class="text-xs font-semibold text-gray-400 border-1 rounded-sm p-2">please</span>
        <span class="text-xs font-semibold text-gray-400 border-1 rounded-sm p-2">taginess</span>
    </div>
    {/if}
</div>
