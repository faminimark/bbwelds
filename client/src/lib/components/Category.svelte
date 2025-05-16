<script lang="ts">
	let { categories } = $props();
</script>

<h3 class="text-xl text-gray-700 font-semibold">Filter by category</h3>
<ul class="flex flex-col">
	{#each categories as category}
	<li>
		<a href='/' class="font-semibold text-gray-500">
			{category}
		</a>
	</li>
	{/each}
</ul>