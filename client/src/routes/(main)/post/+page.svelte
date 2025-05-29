<script lang="ts">
    import BackButton from '$lib/components/BackButton.svelte'
    import Card from '$lib/components/Card.svelte'
    import { Text, TextArea, Select } from '$lib/components/Fields'

    let { data } = $props();

    const handleCreatePost = async (event: SubmitEvent & { currentTarget: EventTarget & HTMLFormElement}) => {
        event.preventDefault();
        const form = new FormData(event.currentTarget);

        const response = await fetch('http://localhost:4000/post/create', {
                method: 'POST',
                body: form
            });
    }

</script>
  
<div class="flex flex-col gap-3 max-w-2xl self-center max-sm:w-full  min-sm:min-w-2xl">
    <BackButton />
    <h1 class="font-bold text-4xl">Create Post</h1>
    <Card>
        <form class="flex flex-col gap-3" onsubmit={handleCreatePost}>
            <Text name={'title'} placeholder={'Title'} max={50}></Text>
            <Select name={'category'} placeholder="Pick a trade" options={data.categories} select={(val) => {  }}/>
            <label for="file">
                <input name="file" type="file" aria-label="Choose an image" placeholder="Select image" class="min-w-[280px] border-1 border-gray-300 rounded-md p-4 w-full" accept="image/*,video/*" multiple/>
            </label>
            <TextArea placeholder="Add a short description" name="description" max={250}/>  
            <Text name={'tag'} placeholder={'Add at least 1 tag'}></Text>
            <div class="flex justify-end">
                <button type="submit" class="px-[9px] py-[5px] cursor-pointer rounded-sm bg-blue-500 text-white font-semibold max-sm:w-full text-center">Post</button>
            </div>
        </form>
    </Card>
</div> 