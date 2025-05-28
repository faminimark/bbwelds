<script lang="ts">
    import { Display } from '$lib/components/Fields'
    import Card from '$lib/components/Card.svelte'
    import { ShareButton } from '$lib/components/Buttons'
    import BackButton from '$lib/components/BackButton.svelte'
    import { MessageSquare, PencilIcon, Plus } from 'lucide-svelte'
    const { data } = $props()

    let isLoggedIn = data.isLoggedIn;
    let user = data.user;
</script>


<div class="flex flex-col gap-7">
    <BackButton />
    <div class="flex flex-col gap-7 max-w-[980px] self-center">
        <Card>
            <div class="flex flex-row max-md:flex-col gap-3">
                <div class="flex flex-col gap-3">
                    <h2 class="text-2xl font-bold text-gray-700">{ user.fullname }</h2>
                    <div class="flex flex-col gap-3">
                        <div class="max-h-[450px] max-w-[400px] bg-gray-300">
                            <img aria-label="profile pic" alt="profile pic" src="https://picsum.photos/400"/>
                        </div>
                        <!-- If user then edit profile otherwise send message -->
                        {#if isLoggedIn}
                            <div>
                                <button class="flex gap-2 cursor-pointer font-semibold p-3 text-gray-700 rounded-md border-1 border-gray-700">
                                    <PencilIcon class="w-[25px]"/> Edit Profile
                                </button>
                            </div> 
                        {:else}
                            <div class="flex justify-between">
                                <button class="flex gap-2 cursor-pointer font-semibold p-3 text-gray-700 rounded-md hover:bg-gray-100 border-gray-700">
                                    <MessageSquare class="w-[25px]"/> Send message
                                </button>
                                <button class="text-gray-300 font-light text-sm cursor-pointer">
                                    Report User
                                </button>
                            </div>
                        {/if}
                    </div>
                </div>
                <div class="flex flex-col gap-12 max-md:gap-4">
                    <div class="flex justify-end">
                        <ShareButton />
                    </div>
                    <div>
                        <header class="font-semibold text-sm">About</header>
                        <p class="max-w-[400px] text-sm text-gray-500">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla, ea hic consectetur accusamus 
                            expedita veritatis pariatur provident temporibus similique quibusdam maxime tenetur, unde adipisci, laborum debitis cupiditate dolorem velit doloribus.
                        </p>
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
    </div>
    <div>
        <div class="flex justify-between">
            <h2  class="text-2xl">Gallery</h2>
            {#if isLoggedIn}
            <div class="flex gap-4">
                <button class="flex gap-2 cursor-pointer font-semibold p-3 text-gray-700 rounded-md  border-gray-700  hover:bg-gray-100">
                    <PencilIcon class="w-[20px]"/> <span class="max-sm:hidden">Edit Gallery</span>
                </button>
                <button class="flex gap-2 cursor-pointer font-semibold p-3 text-gray-700 rounded-md  border-gray-700  hover:bg-gray-100">
                    <Plus class="w-[20px]"/> <span class="max-sm:hidden">Add to Gallery</span>
                </button>
            </div>
            {/if}
        </div>
        <hr />
        gallery or masonry?
    </div>
    <div>
        <h2  class="text-2xl">Posts</h2>
        <hr />
        Feed
    </div>
</div>