<script lang="ts">
    import { ChevronDown, ChevronUp } from "lucide-svelte";


   const { title, children } = $props()
    let isOpen = $state(true);

</script>



<div class="border rounded-md bg-white border-gray-300 ">
    <button onclick={() => isOpen = !isOpen} type="button" class="flex justify-between items-center w-full p-2 font-semibold cursor-pointer">{title} <ChevronDown/></button>

    <div class="{isOpen ? 'flex' : 'hidden'} flex-wrap border-t border-gray-300 w-full p-2">
        {@render children()}
    </div>
</div>