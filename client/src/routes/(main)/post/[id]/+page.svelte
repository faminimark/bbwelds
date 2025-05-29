<script>
    import Link from '$lib/components/Profile/Link.svelte'
    import BackButton from '$lib/components/BackButton.svelte'
    import AddComment from '$lib/components/Comments/Add.svelte'
    import { DownvoteButton, UpvoteButton, ShareButton } from '$lib/components/Buttons'

    let { data } = $props()
    let { title, description, created_at, users } = data.data;
    const date = new Date(created_at)
    const localizedDateString = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`
</script>

<div class="flex flex-col gap-12">
    <div class=" flex flex-col justify-center gap-4">
        <BackButton />
        <header class="text-3xl font-semibold">{title}</header>
        <Link user_id={users.user_id} created_at={localizedDateString} name={users.fullname}/>
        <div class="flex justify-center bg-gray-100 p-6">
            <img aria-label="feed" alt="feed" src="https://picsum.photos/900/1200" class="max-h-[850px] max-w-[850px] aspect-auto w-full"/>
        </div>
        <desc>{ description }</desc>
        <div class="flex flex-row">
            <DownvoteButton />
            <UpvoteButton />
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