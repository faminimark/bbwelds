<script lang="ts">
    import { enhance } from '$app/forms';
    import BackButton from '$lib/components/BackButton.svelte'
    import { Text, TextArea, Picker, FilePicker } from '$lib/components/Fields'
    import { Rocket } from 'lucide-svelte';

    let { data } = $props();
</script>
  
<div class="grid grid-cols-5 gap-3 max-w-2xl self-center max-sm:w-full  min-sm:min-w-2xl">
    <div class="flex flex-col col-span-4 gap-3">
        <BackButton />
        <h1 class="font-bold text-4xl">Share your build story</h1>
        <form class="flex flex-col gap-3" method="POST" use:enhance enctype="multipart/form-data">
            <Text name={'title'} placeholder={'Title'} max={50}></Text>
            <Picker name={'category'} placeholder="Select the build categories" options={data.categories} />
            <FilePicker />
            <TextArea placeholder="Add your build story" name="description" max={250}/>
            <div class="flex justify-end">
                <button type="submit" class="px-3 py-2 cursor-pointer rounded-sm bg-blue-500 text-white font-semibold max-sm:w-full text-center flex gap-2"><Rocket /> Post</button>
            </div>
        </form>
    </div>
    <div class="col-span-1">
        Story Rules
    </div>
</div> 