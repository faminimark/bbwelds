<script lang="ts">
    let { user_id, created_at, name } = $props();
</script>

<a href="/profile/{ user_id }" class="text-[10px] text-gray-500 mt-[-5px]">By { name } at { created_at }</a>