<script lang="ts">
    import emblaCarouselSvelte from 'embla-carousel-svelte'
    import {ChevronRight, ChevronLeft} from 'lucide-svelte'
    let { image_count, children } = $props()
    let emblaApi: { scrollPrev: () => any; scrollNext: () => any; };

    const onInit = (event: { detail: { scrollPrev: () => any; scrollNext: () => any; }; }) => {
        emblaApi = event.detail
    }

</script>
<div class="relative">
    <div class="embla overflow-hidden" use:emblaCarouselSvelte onemblaInit={onInit}>
        <div class="embla__container flex w-full">
            {@render children() }
        </div>
    </div>

    {#if image_count > 1}
        <button class="absolute top-1/2 left-2 embla__prev text-gray-500 opacity-60 bg-gray-50 hover:opacity-100 hover:bg-gray-50 cursor-pointer rounded-full p-1" onclick={() => emblaApi.scrollPrev()}><ChevronLeft class="w-10 h-10"/></button>
        <button class="absolute top-1/2 right-2 embla__next text-gray-500 opacity-60 bg-gray-50 hover:opacity-100 hover:bg-gray-50 cursor-pointer rounded-full p-1" onclick={() => emblaApi.scrollNext()}><ChevronRight class="w-10 h-10"/></button>
    {/if}
</div>