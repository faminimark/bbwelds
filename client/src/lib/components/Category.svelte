<script lang="ts">
	let { categories } = $props();
</script>

<div class="max-sm:p-1 flex gap-2 flex-col">
	<div class="flex max-lg:overflow-auto">
		<ul class="flex flex-row gap-2 min-h-[45px] pt-2 w-full capitalize">
			<li>
				<a href='/' class="font-semibold text-gray-500 max-sm:text-sm border-gray-400 border-1 shadow-md p-1 px-3 rounded-xs text-nowrap">
					All
				</a>
			</li>
			{#each categories as category}
			<li>
				<a href='/category/{category.value}' class="font-semibold text-gray-500 max-sm:text-sm border-gray-400 border-1 shadow-md p-1 px-3 rounded-xs text-nowrap">
					{category.displayValue}
				</a>
			</li>
			{/each}
		</ul> 
	</div>
</div>