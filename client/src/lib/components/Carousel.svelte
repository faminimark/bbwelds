<script lang="ts">
    import emblaCarouselSvelte from 'embla-carousel-svelte'
    import {ChevronLeftCircleIcon, ChevronRightCircle} from 'lucide-svelte'
    let { children } = $props()
    let emblaApi: { scrollPrev: () => any; scrollNext: () => any; };

    const onInit = (event: { detail: { scrollPrev: () => any; scrollNext: () => any; }; }) => {
        emblaApi = event.detail
    }

</script>
<div class="relative">
    <div class="embla overflow-hidden" use:emblaCarouselSvelte onemblaInit={onInit}>
        <div class="bg-gray-100 embla__container flex w-full">
            {@render children()}
        </div>
    </div>
    <div class="flex justify-between absolute top-1/2 w-full p-2">
        <button class="embla__prev text-gray-500 opacity-40 hover:opacity-100 cursor-pointer" onclick={() => emblaApi.scrollPrev()}><ChevronLeftCircleIcon class="w-10 h-10"/></button>
        <button class="embla__next text-gray-500 opacity-40 hover:opacity-100 cursor-pointer" onclick={() => emblaApi.scrollNext()}><ChevronRightCircle class="w-10 h-10"/></button>
    </div>
</div>