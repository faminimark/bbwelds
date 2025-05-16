<script lang="ts">
    const logo = '/logo.svg';
    import { PencilIcon } from 'heroicons-svelte/24/solid';
</script>

<div class="pt-5 sticky top-0 right-0 left-0 bg-white">
    <div class="flex flex-row items-center justify-between pb-[15px] px-8">
        <div class="flex flex-row">
            <a aria-label="bbwelds logo" href="/" class="flex flex-row">
                <img alt="bbwelds image" src={logo} class="h-[25px]"/>
                <h1 class="font-semibold text-lg max-sm:text-xs tagline">Portfolio, Powered by Peers</h1>
            </a>
        </div>

        <div class="flex flex-row gap-3 items-center">
            <a href="/login">Login</a>
            <a href="/profile">Profile</a>
            
            <a href="/post" class="px-[9px] py-[5px] cursor-pointer rounded-full bg-blue-500 text-white font-semibold flex gap-2 items-center">
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