<script lang="ts">
    import { ArrowLeft } from 'lucide-svelte';

    const backHandler = () => {
        window.history.back();
    }
</script>

<div>
    <button onclick={backHandler} class="cursor-pointer">
        <ArrowLeft />
    </button>
</div>