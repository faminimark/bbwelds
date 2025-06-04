<script>
    import Link from '$lib/components/Profile/Link.svelte'
    import BackButton from '$lib/components/BackButton.svelte'
    import AddComment from '$lib/components/Comments/Add.svelte'
    import { DownvoteButton, UpvoteButton, ShareButton } from '$lib/components/Buttons'
  import Carousel from '$lib/components/Carousel.svelte';
  import { enhance } from '$app/forms';

    let { data } = $props()
    let { title, description, created_at, users, images, votes } = data.data;

    const date = new Date(created_at)
    const localizedDateString = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`
</script>

<div class="flex flex-col gap-12">
    <div class=" flex flex-col justify-center gap-4">
        <BackButton />
        <header class="text-3xl font-semibold">{title}</header>
        <Link user_id={users.user_id} created_at={localizedDateString} name={users.fullname} img_src={'TODO'}/>
        <div class="flex justify-center bg-gray-100 p-6">
            <Carousel image_count={images.length}>
                {#each images as image}
                    <div class="embla__slide w-full flex shrink-0 grow-0 basis-full align-middle justify-center">
                        <img aria-label="feed" alt="feed" src={image.image_url}  />
                    </div>
                {/each}
            </Carousel>
            
        </div>
        <desc>{ description }</desc>
        <div class="flex flex-row">
            <form method="POST" action="?/upvote" use:enhance>
                <UpvoteButton count={votes.upvote}/>
            </form>
            <form  method="POST" action="?/downvote" use:enhance>
                <DownvoteButton  />
            </form>
            <ShareButton />
        </div>
    </div>
    <aside id="comment" class="flex flex-col gap-5">
        <div>
            <header class="text-xl">Comments</header>
            <hr/>
        </div>
        <AddComment />
    </aside>
</div>