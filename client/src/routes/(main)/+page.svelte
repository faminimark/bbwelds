<script lang="ts">
  import { getContext } from 'svelte';
  import Card from '$lib/components/Card.svelte'
  import Feed from '$lib/components/Feed/index.svelte'
  import Category from '$lib/components/Category.svelte'
  const categories = getContext('category')
  let { data } = $props();

</script>

<div class="grid grid-cols-3 max-lg:grid-cols-1 gap-4">
  <div class="flex gap-3 flex-col">
    <Category categories={categories}/>
  </div>

  <div class="col-span-1 flex flex-col gap-4">
    <nav class="flex flex-row justify-between">
      <div class="flex flex-row gap-5 items-center border-b-1 border-gray-300 w-full pb-2">
          <a href="/hot">Featured</a>
          <a href="/new">New</a>
      </div>
    </nav>
    {#each data.data as {title, description, post_id}}
      {#if title}
      <Card>
        <Feed title={title} description={description} post_id={post_id}/>
      </Card>
      {/if}
    {/each}
  </div>

  <div class="text-center text-sm">Ads for Exhibit Trade</div>
</div> 