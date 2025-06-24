<script lang="ts">
    let { children } = $props();
</script>

<div class="border-1 border-gray-200 shadow-sm">
    {@render children()}
</div>