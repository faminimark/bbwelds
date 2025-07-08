<script>
    import { enhance } from '$app/forms';
    import Link from '$lib/components/Profile/Link.svelte'
    import BackButton from '$lib/components/BackButton.svelte'
    import AddComment from '$lib/components/Comments/Add.svelte'
    import { DownvoteButton, UpvoteButton, ShareButton } from '$lib/components/Buttons'
    import Carousel from '$lib/components/Carousel.svelte';
    import { didCurrentUserVote, innerHTML } from '$lib/utils';
    let { data } = $props()
    let { title, description, created_at, users, images, votes, comments, profile_image, post_tags } = data.data;
    const { liked, disliked } = didCurrentUserVote(votes?.user_votes?.[0]?.vote_type)
</script>

<div class="flex flex-col gap-12">
    <div class=" flex flex-col justify-center gap-4">
        <BackButton />
        <div class="flex justify-center p-3 max-lg:p-0">
            <Carousel image_count={images.length}>
                {#each images as image}
                    <div class="embla__slide w-full flex shrink-0 align-middle justify-center">
                        <img aria-label="feed" alt="feed" src={image.image_url} class="w-full object-contain aspect-auto" />
                    </div>
                {/each}
            </Carousel>
        </div>
        <header class="flex text-3xl font-semibold">
            {title} 
            <ShareButton />
        </header>
        <div class="border-y border-gray-200 p-2">
            <Link user_id={users.user_id} name={users.fullname} {created_at} img_src={profile_image}/>
        </div>
        <div class="whitespace-break-spaces text-lg" use:innerHTML={description}></div>
        <div class="flex gap-2">
            {#each post_tags as {tag}}
                <a href="/category/{tag}" class="text-xs font-semibold text-gray-400 border-1 rounded-sm p-2 capitalize cursor-pointer">{tag}</a>
            {/each}
        </div>
        <div class="flex flex-row">
            <form  class="flex flex-row" method="POST" action="?/vote" use:enhance>
                <UpvoteButton count={votes?.upvote} liked={liked} />
                <DownvoteButton  disliked={disliked}/>
            </form>
        </div>
    </div>
    <aside id="comment" class="flex flex-col gap-5">
        <div>
            <header class="text-xl">Comments</header>
            <hr/>
        </div>
        <AddComment />
        <div>
            {#each comments as {users, created_at, comment, profile_image}}
            <div class="p-2">
                <Link user_id={users.user_id} {created_at} name={users.fullname} img_src={profile_image}/>
                <p class="pl-8 text-md">{comment}</p>
            </div>
            {/each}
        </div>
    </aside>
</div>