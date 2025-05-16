<script lang="ts">
    import { Share2 } from 'lucide-svelte'

    let {title, post_id} = $props();
</script>

<div class="flex flex-row items-center justify-between">
    <h2>{title}</h2>
    <button type="button" class="flex flex-row gap-3 p-2 hover:bg-gray-100 rounded-md text-gray-400 justify-end"><Share2 class="w-5 h-5 "/> Share</button>
</div>