<script lang="ts">
    import { Display } from '$lib/components/Fields'
    import Card from '$lib/components/Card.svelte'
    import { ChatBubbleOvalLeftIcon, PencilIcon } from 'heroicons-svelte/24/outline'
</script>

<div class="flex flex-row gap-7">
    <Card>
        <div class="flex flex-col gap-3">
            <h2 class="text-2xl font-bold text-gray-700">Bruce Wayne</h2>
            <div class="flex flex-col gap-3">
                <div class="h-[450px] w-[400px] bg-gray-300">
                    Profile pic
                </div>
                <!-- If user then edit profile otherwise send message -->
                {#if false}
                    <div>
                        <button class="flex gap-2 cursor-pointer font-semibold p-3 text-gray-700 rounded-md border-1 border-gray-700">
                            <PencilIcon class="w-[25px]"/> Edit Profile
                        </button>
                    </div> 
                {:else}
                    <div class="flex justify-between">
                        <button class="flex gap-2 cursor-pointer font-semibold p-3 text-gray-700 rounded-md hover:bg-gray-100 border-gray-700">
                            <ChatBubbleOvalLeftIcon class="w-[25px]"/> Send message
                        </button>
                        <button class="text-gray-300 font-light text-sm cursor-pointer">
                            Report User
                        </button>
                    </div>
                {/if}
                <div>
                    <header class="font-semibold text-sm">About</header>
                    <p class="max-w-[400px] text-sm text-gray-500">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla, ea hic consectetur accusamus expedita veritatis pariatur provident temporibus similique quibusdam maxime tenetur, unde adipisci, laborum debitis cupiditate dolorem velit doloribus.</p>
                </div>
                <div class="flex flex-col gap-3">
                    <Display title="Phone" value={'999999999'}/>
                    <Display title="Email" value={'email@email.com'}/>
                    <Display title="Location" value={'email@email.com'}/>
                    <Display title="License #" value={'999999999'}/>
                    <Display title="Cerifications" value={["AWS 6G", "Certified Rap battle champion", "Certified Lover boy"]} />
                </div>
            </div>
        </div>
    </Card>
    <div>
        <h2  class="text-2xl">Gallery</h2>
        gallery or masonry?
    </div>
</div>