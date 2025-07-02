<script lang="ts">
    import { enhance } from '$app/forms';
    import Accordion from '$lib/components/Accordion.svelte';
    import BackButton from '$lib/components/BackButton.svelte'
    import { Text, Picker, FilePicker, Editor } from '$lib/components/Fields'
    import { Rocket } from 'lucide-svelte'
    let { data } = $props()
</script>


<div class="w-full flex flex-col">
    <BackButton />

<div class="flex flex-col gap-2 max-w-6xl self-center w-full">
    <div class="grid grid-cols-8 max-sm:flex max-sm:flex-col-reverse gap-3 w-full">
        <div class="flex flex-col gap-4 col-span-5">
            <form class="flex flex-col gap-3" method="POST" use:enhance enctype="multipart/form-data">
                <Text name={'title'} placeholder={'Title'} max={50}></Text>
                <FilePicker />
                <Editor name={'description'} />
                <Picker name={'category'} placeholder="Select the build categories" options={data.categories} />
                <div class="flex justify-end">
                    <button type="submit" class="px-3 py-2 cursor-pointer rounded-sm bg-blue-500 text-white font-semibold max-sm:w-full text-center flex gap-2"><Rocket /> Post</button>
                </div>
            </form>
        </div>
        <div class="col-span-3 w-full">
            <Accordion title={'Story Rules'}>
                <ul class="list-decimal list-inside flex flex-col gap-3 text-lg">
                    <li>One story is allowed every 24 hours</li>
                    <li>No illegal activities</li>
                    <li>No pornography</li>
                    <li>No violence or gory contents</li>
                    <li>No hate speech and bullying</li>
                    <li>No deceptive content</li>
                    <li>No impersonation</li>
                    <li>No copyright infringement</li>
                </ul>
            </Accordion>
        </div>
    </div> 
</div>
</div>