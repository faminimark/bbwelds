<script lang="ts">
  import Card from '$lib/components/Card.svelte'
  import Feed from '$lib/components/Feed/index.svelte'
  import Category from '$lib/components/Category.svelte'
  import { goto } from '$app/navigation';
  let { data } = $props();
  const feeds = data.data;
  let tab = $state('featured')
</script>

<div class="grid grid-cols-6 max-lg:grid-cols-1 min-sm:gap-4">
  <div class="flex col-span-1 gap-3 flex-col">
  </div>

  <div class="col-span-4 flex flex-col gap-4">
    <Category categories={data.categories}/>
    {#each feeds as { images, votes, ...rest }}
      <Card>
        <Feed {...rest} votes={votes} images={images}/>
      </Card>
    {:else}
      <p class="text-center p-10 text-3xl">Your feed seems to be empty</p>
    {/each}
  </div>

  <div class="text-center text-sm col-span-1">
    Ads for Build Bard
  </div>
</div> 