<script lang="ts">
  import Feed from '$lib/components/Feed/index.svelte'
  let { data } = $props();
  const feeds = data.data;
</script>

<div class="grid grid-cols-6 max-lg:grid-cols-1 min-sm:gap-4">
  <div class="flex col-span-1 gap-3 flex-col">
  </div>

  <div class="col-span-4 flex flex-col gap-4">
    {#each feeds as { images, votes, ...rest }}
    <div>
        <Feed {...rest} {votes} {images}/>
        </div>
    {:else}
      <p class="text-center p-10 text-3xl">Your feed seems to be empty, be the first bard to <a href="/post" class="text-blue-600">share your build story!</a></p>
    {/each}
  </div>

  <div class="text-center text-sm col-span-1">
    Ads for Build Bard
  </div>
</div> 