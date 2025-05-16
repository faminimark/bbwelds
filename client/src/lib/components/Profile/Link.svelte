<script lang="ts">
    let { user_id, created_at } = $props();
</script>

<a href="/profile/{ user_id }" class="text-[10px] text-gray-500 mt-[-5px]">By James May at { created_at }</a>