<script lang="ts">
    let { children } = $props();
</script>

<div class="p-[10px] border-[1px] border-gray-200 rounded-xl shadow-sm">
    {@render children()}
</div>