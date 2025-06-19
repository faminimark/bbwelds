<script lang="ts">
    import { X } from 'lucide-svelte'

    let { modal = $bindable(), title = undefined } = $props()
</script>

<header>
    <div class="flex w-full justify-between">
        <div class="text-center font-semibold">{title}</div>
        <button class="cursor-pointer" onclick={() => modal.close()}><X/></button>
    </div>
</header>