<script lang="ts">
    import { enhance } from '$app/forms';
import {Camera} from 'lucide-svelte'
    
    interface Props {
        imageURL: string;
        isCurrentUser: boolean;
    }
    
    interface PreviewFile {
        name: string;
        url: string | null;
    }
    
    const {imageURL, isCurrentUser}: Props = $props();
    let preview: PreviewFile | undefined = $state()
    let fileInput: HTMLInputElement | null = $state(null)
    let searchForm: HTMLFormElement | null = $state(null);

    const handleFileChange = async (event: Event) => {
        const target = event.target as HTMLInputElement;
        if (!target.files) return;
        
        const files = Array.from(target.files);
        preview = await new Promise<PreviewFile>((resolve) => {
            const file: File = files[0];

            if (file.type.startsWith('image/')) {
              const reader = new FileReader();
              reader.onload = (e) => resolve({
                name: file.name,
                url: e.target?.result as string
              });
              reader.readAsDataURL(file);
            } else {
              resolve({
                name: file.name,
                url: null
              });
            }
        })

        console.log(searchForm)
        if(searchForm)
            searchForm?.requestSubmit()
    }
</script>

<div class="relative">
    {#if isCurrentUser}
        <img aria-label="profile pic" alt="profile pic" src="{preview ? preview.url : imageURL}" class="w-full rounded-2xl max-sm:max-w-full"/>
        
        <button type="button" class="bg-white absolute top-2 right-2 rounded-full p-2 cursor-pointer border border-gray-200" onclick={() => fileInput?.click()}>
            <Camera />
        </button>
        <form bind:this={searchForm} method="POST" action="?/uploadImage" use:enhance enctype="multipart/form-data">
            <input name="file" type="file" accept="image/*" bind:this={fileInput} class="hidden" onchange={handleFileChange}>
        </form>
    {:else}
        <img aria-label="profile pic" alt="profile pic" src="{imageURL}" class="w-full rounded-2xl max-w-3/4 max-sm:max-w-full" />
    {/if}
</div>