<script lang="ts">
    import Card from '$lib/components/Card.svelte'
</script>
  
<div class="flex flex-col gap-3 max-w-2xl self-center max-sm:w-full  min-sm:min-w-2xl">
    <h1 class="font-bold text-4xl">Create Post</h1>

    <!-- TODO: Create lib components for these inputs -->
    <Card>
        <form class="flex flex-col gap-3">
            <div class="flex flex-col gap-2">
                <label for="title" class="min-w-[280px] border-1 border-gray-300 rounded-md relative">
                    <input name='title'  placeholder="Title" class="w-full p-4" />
                    <div class="absolute right-0 top-0 px-4 border-l-gray-300 border-l-1 h-full text-gray-600 pt-4">
                        50
                    </div>
                </label>
            </div>
            <div class="flex flex-col gap-2">
                <label for="title">
                    Choose a Category:  
                </label>
                <select name='title' class="min-w-[280px] border-1 border-gray-300 rounded-md p-4" placeholder="category">
                    <option>Weld</option>
                    <option>Fab</option>
                    <option>Elect</option>
                    <option>Auto Body</option>
                    <option>Paint</option>
                </select>
            </div>
            <div class="flex flex-col gap-2">
                <label for="file">
                    <input name="file" type="file" aria-label="Choose an image" placeholder="Select image" class="min-w-[280px] border-1 border-gray-300 rounded-md p-4 w-full"/>
                </label>
            </div>
            <div class="flex flex-col gap-2">
                <label for="desc" class="min-w-[280px] border-1 border-gray-300 rounded-md relative">
                    <textarea name="desc" placeholder="Add a short description" class="w-full p-4" rows="2" maxlength="250"/>
                    <div class="absolute right-0 top-0 px-4 border-l-gray-300 border-l-1 h-full text-gray-600 pt-8">
                        250
                    </div>
                </label>
            </div>
            <div class="flex flex-col gap-2">
                <label for="tag" class="min-w-[280px] border-1 border-gray-300 rounded-md">
                    <input name="tag" class="w-full p-4" placeholder="Add at least 1 tag"/>    
                </label>
            </div>
            <div class="flex justify-end">
                <button class="px-[9px] py-[5px] cursor-pointer rounded-full bg-blue-500 text-white font-semibold max-sm:w-full text-center">Post</button>
            </div>
        </form>
    </Card>
</div> 