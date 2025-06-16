<script>
    import Link from '$lib/components/Profile/Link.svelte'
    import BackButton from '$lib/components/BackButton.svelte'
    import AddComment from '$lib/components/Comments/Add.svelte'
    import { DownvoteButton, UpvoteButton, ShareButton } from '$lib/components/Buttons'
    import Carousel from '$lib/components/Carousel.svelte';
    import { enhance } from '$app/forms';
    import { didCurrentUserVote } from '$lib/utils/index.js';

    let { data } = $props()
    let { title, description, created_at, users, images, votes, comments } = data.data;
    const { liked, disliked } = didCurrentUserVote(votes?.user_votes?.[0]?.vote_type)

    const date = new Date(created_at)
    const localizedDateString = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`
</script>

<div class="flex flex-col gap-12">
    <div class=" flex flex-col justify-center gap-4">
        <BackButton />
        <header class="text-3xl font-semibold">{title}</header>
        <Link user_id={users.user_id} created_at={localizedDateString} name={users.fullname} img_src={''}/>
        <div class="flex justify-center bg-gray-100 p-6">
            <Carousel image_count={images.length}>
                {#each images as image}
                    <div class="embla__slide w-full flex shrink-0 grow-0 basis-full align-middle justify-center">
                        <img aria-label="feed" alt="feed" src={image.image_url} class="w-full h-full object-cover aspect-auto" />
                    </div>
                {/each}
            </Carousel>
        </div>
        <desc>{ description }</desc>
        <div class="flex flex-row">
            <form  class="flex flex-row" method="POST" action="?/vote" use:enhance>
                <UpvoteButton count={votes?.upvote} liked={liked} />
                <DownvoteButton  disliked={disliked}/>
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
        <div>
            {#each comments as comment}
            <div class="p-2">
                <Link user_id={comment.users.user_id} created_at={comment.created_at} name={comment.users.fullname} img_src={''}/>
                <p class="pl-8 text-md">{comment.comment}</p>
            </div>
            {/each}
        </div>
    </aside>
</div>