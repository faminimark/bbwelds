<script lang="ts">
    const { text } = $props()
</script>

<div class="relative">
    <hr>
    <div class="absolute w-full top-[-12px] flex">
        <div class="bg-white text-center self-center text-md pr-2">
            {text}
        </div>
    </div>
</div>