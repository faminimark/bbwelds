<script lang="ts">
  import Card from '$lib/components/Card.svelte'
  import Feed from '$lib/components/Feed/index.svelte'

  let { data } = $props();
</script>

<!-- Loop through data here -->
<div class="grid grid-cols-3 max-lg:grid-cols-1 gap-4">
  <div>Filter by Trade show list with (IBEW, Fitters, welders, machinists, etc.)</div>

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