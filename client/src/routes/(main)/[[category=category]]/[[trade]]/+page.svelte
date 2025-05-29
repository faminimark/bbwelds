<script lang="ts">
  import Card from '$lib/components/Card.svelte'
  import Feed from '$lib/components/Feed/index.svelte'
  import Category from '$lib/components/Category.svelte'
  import { goto } from '$app/navigation';
  let { data } = $props();

  let tab = $state('featured')
</script>

<div class="grid grid-cols-5 max-lg:grid-cols-1 min-sm:gap-4">
  <div class="flex gap-3 flex-col">
    <Category categories={data.categories}/>
  </div>

  <div class="col-span-3 flex flex-col gap-4">
    <nav class="flex flex-row justify-between">
      <div class="flex flex-row gap-5 items-center border-b-1 border-gray-300 w-full pb-2">
          <button onclick={() => {
              tab = 'featured'
              goto('/featured')
            }} class="cursor-pointer {tab === 'featured' ? 'border-b-2' : ''}">
            Featured
          </button>
          <button onclick={() => {
              tab = 'new'
              goto('/new')
          }} class="cursor-pointer {tab === 'new' ? 'border-b-2' : ''}">
            New
          </button>
      </div>
    </nav>
    {#each data.data as {title, description, created_at, post_id, users}}
      {#if title}
      <Card>
        <Feed created_at={created_at} title={title} description={description} post_id={post_id} user={users}/>
      </Card>
      {/if}
    {/each}
  </div>

  <div class="text-center text-sm">Ads for Exhibit Trade</div>
</div> 