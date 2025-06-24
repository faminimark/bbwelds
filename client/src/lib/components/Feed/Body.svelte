<script lang="ts">
    import Carousel from '$lib/components/Carousel.svelte'
    import { getRelativeTime } from '$lib/utils';
    import Avatar from '../Profile/Avatar.svelte';

    let {post_id, images, title, user, created_at, profile_image } = $props()
    const date = new Date(created_at)
    let formattedDate =  getRelativeTime(date)
</script>

<div class="flex flex-col min-w-280px">
    <Carousel image_count={images.length} >
        {#each images as image}
            <a href="/post/{post_id}" class="embla__slide w-full flex shrink-0 grow-0 basis-full">
                <img aria-label="feed" alt="feed" src={image.image_url} class="w-full h-full object-cover aspect-auto" />
            </a>
        {/each}
    </Carousel>
        <div class="absolute bottom-0 p-4 bg-linear-to-b from-black/50 from-60% to-black/30 border-white text-white w-full flex gap-4 align-middle">
            <Avatar img_src={profile_image} user_id={user.user_id}/>
            <div class="w-full flex flex-col align-middle">
                <div class="flex flex-row items-center justify-between">
                    <h2 class="text-xl font-semibold text-white">{ title }</h2>
                    <span>{ formattedDate }</span>
                </div>

                <a href="/profile/{ user.user_id }" class="text-sm text-inherit"> { user.fullname } </a>
            </div>
        </div>
</div>

