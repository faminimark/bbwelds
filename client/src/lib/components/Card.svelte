<script lang="ts">
    let { children } = $props();
</script>

<div class="p-[10px] border-[1px] border-gray-200 shadow-sm">
    {@render children()}
</div>