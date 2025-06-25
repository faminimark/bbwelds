<script lang="ts">
    const { text } = $props()
</script>

<div class="relative">
    <hr>
    <div class="absolute w-full top-[-18px] flex justify-center">
        <div class="bg-[#f8f8f8] w-20 text-center self-center text-3xl">
            {text}
        </div>
    </div>
</div>