<script lang="ts">
    const logo = '/logo.svg';
    import { PencilIcon } from 'lucide-svelte';
</script>

<div class="pt-5 sticky top-0 right-0 left-0 bg-white">
    <div class="flex flex-row items-center justify-between pb-[15px] max-sm:px-2 max-sm:pb-[6px] px-8">
        <div class="flex flex-row">
            <a aria-label="bbwelds logo" href="/" class="flex flex-row items-center">
                <img alt="logo" src={logo} class="h-[25px]"/>
                <div>
                    <h1 class="font-semibold text-gray-800 text-lg tagline">Exhibit Trade</h1>
                    <h4 class=" text-gray-500 text-xs tagline">Your Portfolio, Powered by Peers</h4>
                </div>
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