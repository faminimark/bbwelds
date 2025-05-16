<script lang="ts">
    import { Share2 } from 'lucide-svelte'

    let {title, post_id, user_id } = $props();
    let created_at = new Date().toDateString()
</script>

<div>
    <div class="flex flex-row items-center justify-between">
        <h2 class="text-xl text-gray-700 font-semibold">{ title }</h2>
        <button type="button" class="text-sm flex flex-row gap-2 p-2 hover:bg-gray-100 rounded-md text-gray-400 justify-end align-middle">
            <Share2 class="w-5 h-5 "/> Share
        </button>
    </div>
    <a href="/profile/{ user_id }" class="text-[10px] text-gray-500 mt-[-5px]">By James May at { created_at }</a>
</div>