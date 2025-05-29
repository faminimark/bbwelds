<script lang="ts">
    import { Display } from '$lib/components/Fields'
    import Card from '$lib/components/Card.svelte'
    import { ShareButton } from '$lib/components/Buttons'
    import BackButton from '$lib/components/BackButton.svelte'
    import Feed from '$lib/components/Feed'

    import { MessageSquare, PencilIcon, Plus } from 'lucide-svelte'
    import { redirect } from '@sveltejs/kit';
    const { data } = $props()
    let isLoggedIn = data.isLoggedIn
    let user = data.data

    if(!user) throw redirect(302, `/`);
    
    let location = user?.locations
    let contacts = user?.contacts
</script>


<div class="flex flex-col gap-7">
    <BackButton />
    <div class="flex flex-col gap-7 max-w-[980px] self-center">
        <Card>
            <div class="flex flex-row max-md:flex-col gap-3">
                <div class="flex flex-col gap-3">
                    <h2 class="text-2xl font-semibold text-gray-700">{ user.fullname }</h2>
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
                            { user.profile_description }
                        </p>
                    </div>
                    <div class="flex flex-col gap-3">
                        {#each contacts as contact}
                            <Display title={contact.contact_type} value={contact.value}/>
                        {/each}
                        <Display title="Location" value={`${location.city}, ${location.state_region} ${location.zip_postal}`}/>
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
    <div class="flex flex-col">
        <h2  class="text-2xl">Posts</h2>
        <hr />
        {#if user.posts.length}
            <div class="grid grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1  gap-2 p-2">
                {#each user.posts as {title, description, created_at, post_id}}
                    {#if title}
                    <Card>
                        <Feed title={title} description={description} post_id={post_id} user={user} created_at={created_at}/>
                    </Card>
                    {/if}
                {/each}
            </div>
        {:else}
            <div class="text-center w-full py-5 text-lg">
                {user.f_name} is still working on his posts
            </div>
        {/if}
    </div>
</div>