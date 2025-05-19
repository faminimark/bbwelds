<script lang="ts">
    import { ArrowLeft } from 'lucide-svelte';
    import { backHandler } from '$lib/utils'
</script>

<div>
    <button onclick={backHandler} class="cursor-pointer">
        <ArrowLeft />
    </button>
</div>