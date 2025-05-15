<script lang="ts">
    import Card from '$lib/components/Card.svelte'
    import { Text, TextArea, Select } from '$lib/components/Fields'

    let options = [
        {value: 'weld', displayValue: 'Welding'},
        {value: 'elect', displayValue: 'Electrician'},
        {value: 'automotive', displayValue: 'Automotive'},
        {value: 'construction', displayValue: 'Construction'},
        {value: 'ironworker', displayValue: 'Iron Worker'}
    ]
</script>
  
<div class="flex flex-col gap-3 max-w-2xl self-center max-sm:w-full  min-sm:min-w-2xl">
    <h1 class="font-bold text-4xl">Create Post</h1>

    <!-- TODO: Create lib components for these inputs -->
    <Card>
        <form class="flex flex-col gap-3">
            <Text name={'title'} placeholder={'Title'} max={50}></Text>
            <Select name={'category'} placeholder="Pick a trade" options={options} select={(val) => { console.log({val})}}/>
            <label for="file">
                <input name="file" type="file" aria-label="Choose an image" placeholder="Select image" class="min-w-[280px] border-1 border-gray-300 rounded-md p-4 w-full"/>
            </label>
            <TextArea placeholder="Add a short description" name="description" max={250}/>  
            <Text name={'tag'} placeholder={'Add at least 1 tag'}></Text>
            <div class="flex justify-end">
                <button class="px-[9px] py-[5px] cursor-pointer rounded-full bg-blue-500 text-white font-semibold max-sm:w-full text-center">Post</button>
            </div>
        </form>
    </Card>
</div> 