<script lang="ts">
	let { categories } = $props();
</script>

<div class="max-sm:p-1 flex gap-2 flex-col">
	<h3 class="text-xl text-gray-700 font-semibold max-sm:text-md max-sm:font-normal">Filter by category</h3>
	<div class="flex max-lg:overflow-auto">
		<ul class="flex flex-col max-lg:flex-row gap-2 min-h-[45px] pt-2 w-full capitalize">
			{#each categories as category}
			<li>
				<a href='/category/{category.value}' class="font-semibold text-gray-500 max-sm:text-sm max-lg:border-gray-400 max-lg:border-1 max-lg:shadow-md p-1 rounded-xs text-nowrap">
					{category.displayValue}
				</a>
			</li>
			{/each}
		</ul> 
	</div>
</div>