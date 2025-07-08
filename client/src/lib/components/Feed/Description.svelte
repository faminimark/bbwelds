 <script lang="ts">
    import { innerHTML } from '$lib/utils';
    let { description, post_tags } = $props()
</script>
 
<div class="p-2 flex flex-col gap-3">
    <div class="text-md font-normal text-gray-600 leading-7 whitespace-break-spaces" use:innerHTML={description}></div>
    <div class="flex gap-2 flex-wrap">
        {#each post_tags as {tag}}
            <a href="/category/{tag}" class="text-xs font-semibold text-gray-400 border-1 rounded-sm p-2 capitalize cursor-pointer">{tag}</a>
        {/each}
    </div>
</div>