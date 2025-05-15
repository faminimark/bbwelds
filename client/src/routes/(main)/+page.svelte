<script lang="ts">
  import Card from '$lib/components/Card.svelte'
  import Feed from '$lib/components/Feed/index.svelte'

  let { data } = $props();
</script>

<div class="grid grid-cols-3 max-lg:grid-cols-1 gap-4">
  <div class="flex gap-3 flex-col">
    <!-- Fetch categories and loop them here? Does this need to be a DB entry? I think it can be an enum -->
    <h3 class="text-xl font-bold">Trade Categories</h3>
    <ul class="flex flex-col">
      <li>
        <a href='/' class="font-semibold text-blue-600">
          Welding
        </a>
      </li>
      <li>
        <a href='/' class="font-semibold text-blue-600">
          Electrician
        </a>
      </li>
        <li>
        <a href='/' class="font-semibold text-blue-600">
          Mechanic
        </a>
      </li>
      <li>
        <a href='/' class="font-semibold text-blue-600">
          Plumber
        </a>
      </li>
      <li>
        <a href='/' class="font-semibold text-blue-600">
          Landscaper
        </a>
      </li>
      <li>
        <a href='/' class="font-semibold text-blue-600">
          Painter
        </a>
      </li>
    </ul>
  </div>

  <div class="col-span-1 flex flex-col gap-4">
    <nav class="flex flex-row justify-between">
      <div class="flex flex-row gap-5 items-center border-b-1 border-gray-300 w-full pb-2">
          <a href="/hot">Featured</a>
          <a href="/new">New</a>
      </div>
    </nav>
    {#await data}<!-- promise is pending -->
    <p>waiting for the promise to resolve...</p>{/await}
    {#each data.data as {title, description, post_id}}
      {#if title}
      <Card>
        <Feed title={title} description={description} post_id={post_id}/>
      </Card>
      {/if}
    {/each}
  </div> 
  <div>ads/sponsors</div>
</div> 