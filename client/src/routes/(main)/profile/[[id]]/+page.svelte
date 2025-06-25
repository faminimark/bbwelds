<script lang="ts">
    import { Display } from '$lib/components/Fields'
    import { ShareButton } from '$lib/components/Buttons'
    import BackButton from '$lib/components/BackButton.svelte'
    import Carousel from '$lib/components/Carousel.svelte'
    import Edit from '$lib/components/Profile/Edit.svelte'
    import Modal from '$lib/components/Modal/index'
    import Masonry from '$lib/components/Masonry.svelte'
    
    import { generateFromString } from 'generate-avatar'
    import type { PostsByYear } from './types';
    import { redirect } from '@sveltejs/kit';
    import { MessageSquare, PencilIcon, Plus } from 'lucide-svelte'
    import { Centered } from '$lib/components/Dividers';
    
    const { data } = $props()
    const current_user = $derived(data?.user)
    const user = $derived(data.data)
    const posts: PostsByYear = $derived(user.posts);

    $effect(() => {
        if(!user) throw redirect(302, `/`)
    });

    const isCurrentUser = $derived(Boolean(current_user && user.user_id === current_user?.user_id))
    const location = $derived(user?.locations)
    const contacts = $derived(user?.contacts)
    const avatar = $derived(user?.profile_image?.image_url)
    const imageURL = $derived(Boolean(avatar) ? avatar :  `data:image/svg+xml;utf8,${generateFromString(user.user_id)}`)

    const licenses = false
</script>


<div class="flex flex-col gap-7">
    <BackButton />
    <div class="flex flex-col gap-7 w-full">
        <div class="max-sm:bg-transparent max-sm:flex max-sm:flex-col-reverse w-full grid grid-cols-2">
            <div class="flex flex-col p-4 justify-between col-span-1">
                <div class="flex flex-col gap-6">
                    <div>
                        <h2 class="text-2xl font-semibold text-gray-700 flex justify-between">
                            { user.fullname } 
                            <ShareButton />
                        </h2>
                        <small class="text-sm color-gray-500">Apprentice Welder/SWE/Machinist</small>
                    </div>
                    {#if user.profile_description}
                    <div>
                        <header class="font-semibold text-sm">About</header>
                        <desc class="max-w-[400px] text-sm text-gray-500">
                            { user.profile_description }
                        </desc>
                    </div>
                    {/if}
                    <div class="flex flex-col gap-3">
                        {#each contacts as contact}
                            <Display title={contact.contact_type} value={contact.value}/>
                        {/each}
                        {#if location}
                        <Display title="Location" value={`${location.city}, ${location.state_region} ${location.zip_postal} ${location.country}`}/>
                        {/if}
                        {#if licenses}
                        <Display title="License #" value={'999999999'}/>
                        <Display title="Cerifications" value={["AWS 6G", "Certified Rap battle champion", "Certified Lover boy"]} />
                        {/if}
                    </div>
                </div>
                <!-- If user then edit profile otherwise send message -->
                {#if isCurrentUser}
                    <div>
                        <Modal label={'Edit Profile'} title={"Edit Profile"} Icon={PencilIcon} type={'submit'} form="profile-edit">
                            <Edit user={user}/>
                        </Modal>
                    </div> 
                {:else}
                    <div class="flex justify-between">
                        <button class="flex gap-2 cursor-pointer font-semibold p-3 text-gray-700 rounded-md hover:bg-gray-100 border-gray-700">
                            <MessageSquare class="w-[25px]"/> Send message
                        </button>
                        <button class="text-gray-500 font-light text-sm cursor-pointer">
                            Report User
                        </button>
                    </div>
                {/if}
            </div>
            <img aria-label="profile pic" alt="profile pic" src="{imageURL}" class="w-full col-span-1" />
        </div>
    </div>
    <div class="flex flex-col gap-6">
        <div class="flex flex-row justify-between">
            <h2  class="text-2xl self-center flex font-semibold">Stories</h2>
            {#if isCurrentUser}
            <div class="flex gap-4">
                <button class="flex gap-2 cursor-pointer font-semibold p-3 text-gray-700 rounded-md  border-gray-700  hover:bg-gray-100">
                    <PencilIcon class="w-[20px]"/> <span class="max-sm:hidden">Edit Gallery</span>
                </button>
                <a href="/post" class="flex gap-2 cursor-pointer font-semibold p-3 text-gray-700 rounded-md  border-gray-700  hover:bg-gray-100">
                    <Plus class="w-[20px]"/> <span class="max-sm:hidden">Add to Gallery</span>
                </a>
            </div>
            {/if}
        </div>
        <!-- Make the post here sorted by date -->
        {#if posts.length}
            {#each posts as yearGroup}
                <div class="flex flex-col gap-8">
                    {#each Object.entries(yearGroup) as [year, posts]}
                    <div class="flex flex-col gap-6">
                        <Centered text={year}/>
                        <Masonry columns={{lg: 3, md: 2, sm: 1}} gap={14}>
                            {#each posts as {images, post_id}}
                                <Carousel image_count={images.length} >
                                    {#each images as image}
                                        <a href="/post/{post_id}" class="embla__slide w-full flex shrink-0 grow-0 basis-full">
                                            <img aria-label="feed" alt="feed" src={image.image_url} class="w-full h-full object-cover aspect-auto" />
                                        </a>
                                    {/each}
                                </Carousel>
                            {/each}
                        </Masonry>
                    </div>
                    {/each}
                </div>
            {/each}
        {:else}
            <div class="text-center w-full py-5 text-lg">
                {user.f_name} is still working on his Stories!
            </div>
        {/if}
    </div>
</div>