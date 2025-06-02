<script lang="ts">
    const logo = '/bb-logo.svg';
    import { PencilIcon } from 'lucide-svelte';
    const { isLoggedIn, user_id } = $props()
</script>

<div class="pt-[7px] sticky top-0 right-0 left-0 z-[10000] bg-white shadow-md">
    <div class="flex flex-row items-center justify-between pb-[5px] max-sm:px-2 max-sm:pb-[6px] px-8">
        <div class="flex flex-row">
            <a aria-label="bbwelds logo" href="/" class="flex flex-row items-center">
                <img alt="logo" src={logo} class="h-[60px]"/>
                <div class="flex flex-col ">
                    <h1 class="font-semibold text-gray-800 text-lg tagline">Build Bard Studios</h1>
                    <h4 class=" text-gray-500 text-xs tagline">Every Build Tells a Story</h4>
                </div>
            </a>
        </div>

        <div class="flex flex-row gap-3 items-center">
            {#if !isLoggedIn}
                <a href="/login">Login</a>
            {:else}
                <a href="/profile/{user_id}">Profile</a>
            {/if}
            <a href="/post" class="px-[9px] py-[5px] cursor-pointer rounded-sm bg-blue-500 text-white font-semibold flex gap-2 items-center">
                <PencilIcon class="h-4 w-4"/> Post
            </a>
        </div>
    </div>
</div>

<style>
    @media (max-width: 470px){
        .tagline {
            display: none;
        }
    }
</style>