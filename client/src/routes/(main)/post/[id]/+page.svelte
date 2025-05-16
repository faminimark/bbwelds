<script>
    import Link from '$lib/components/Profile/Link.svelte'
    import BackButton from '$lib/components/BackButton.svelte'
    import AddComment from '$lib/components/Comments/Add.svelte'
    let { data } = $props()
    let { title, description, user_id } = data.data;
    let created_at = new Date().toDateString()
</script>

<div class="flex flex-col gap-12">
    <div class=" flex flex-col justify-center gap-4">
        <BackButton />
        <header class="text-3xl font-semibold">{title}</header>
        <Link user_id="user_id" created_at={created_at}/>
        <div class="flex justify-center bg-gray-100 p-6">
            <img aria-label="feed" alt="feed" src="https://picsum.photos/900/1200" class="max-h-[850px] max-w-[850px] aspect-auto"/>
        </div>
        <desc>{ description }</desc>
    </div>
    <aside id="comment" class="flex flex-col gap-5">
        <div>
            <header class="text-xl">Comments</header>
            <hr/>
        </div>
        <AddComment />
    </aside>
</div>