<script lang="ts">
     // @ts-nocheck
    import { X } from 'lucide-svelte'
    import { onMount } from 'svelte'
    import {debounce} from '$lib/utils'
    interface OptionProps {
        placeholder: string;
        name: string;
        values?: string[];
    }

    let { 
        placeholder, 
        name, 
        values = undefined
    }: OptionProps = $props();
    
    let valueSelected: string[] = $state(values ? values: [])
    let tags: string[] = $state([])
    let input: string = $state('');
    let focused = $state(false)

    const handleSelect = (event: { currentTarget: { value: any; }; }) => {
        const  value = tags[event?.currentTarget?.value];
        if(valueSelected.includes(value)){
            valueSelected = valueSelected.filter((v) => v !== value) 
        } else {
            valueSelected.push(value)
        }
    }

    const handleClickOutside = (event: { target: { closest: (arg0: string) => any; }; }) => {
        if (!event.target?.closest('.picker-popup')) {
            focused = false;
        }
    }

    const toggleSelect = (event: { currentTarget: { value: any; }; }) => { 
        const index = event?.currentTarget?.value
        valueSelected.splice(index, 1)

        valueSelected = valueSelected
    }

    const availableOptions = $derived(
        tags.filter(tag => !valueSelected.includes(tag))
    )

    onMount(async() => {
        handleTagSearch();
    })

    const handleNewTag = (e: KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            valueSelected.push(input)
            input = ''
        }
    }

    const handleTagSearch = debounce(async () => {
        const getTags = async () => ((await fetch('http://localhost:4000/category', {
            method: 'POST',
            body: JSON.stringify({input})
        })).json())

        const response = await getTags()
        tags = response.data
    }, 500)
</script>

<div class="relative bg-white picker-popup">
    <label for={name} class="min-w-[280px] w-full border-1 border-gray-300 rounded-md flex flex-col">
        <input name="display" type="text" class="p-4 capitalize border-transparent w-full" placeholder={ placeholder } onfocus={() => focused = true} oninput={() => handleTagSearch()} bind:value={input} onkeydown={handleNewTag}/>
        <div class="p-3 align-middle gap-2 {!valueSelected.length ? 'hidden' : 'flex flex-row flex-wrap border-t border-gray-300'}">
            {#each valueSelected as selected, index}
                <button type="button" value={index} onclick={toggleSelect} class="font-semibold text-blue-400 max-sm:text-sm border-blue-400 border-1 shadow-md p-1 px-2 rounded-xs text-nowrap capitalize cursor-pointer flex gap-0.5">{selected} <X size="15"/></button>
            {/each}
        </div>
        <input type="text" id={name} name={name} class="hidden" bind:value={valueSelected}/>
    </label>

    {#if focused && availableOptions.length}
    <div class="absolute bottom-[100%] bg-white w-full gap-4 py-3 px-5 border-1 overflow-auto border-gray-300 rounded-xs flex flex-row justify-between z-[9999]">
        <div class="flex flex-row gap-2 flex-wrap ">
            {#if availableOptions.length}
                {#each availableOptions as option}
                    <button 
                        type="button" 
                        value={tags.findIndex(o => o === option)} 
                        onclick={handleSelect} 
                        class="font-semibold text-gray-500 max-sm:text-sm border-gray-400 border-1 shadow-md p-1 px-3 rounded-xs text-nowrap capitalize cursor-pointer"
                    >
                        {option}
                    </button>
                {/each}
            {/if}
        </div>
        <div>
            <button type="button" onclick={() => focused = false} class="font-semibold text-xs text-gray-500 max-sm:text-sm text-nowrap capitalize cursor-pointer"><X/></button>
        </div>
    </div>
    {/if}
</div>

<svelte:window onclick={handleClickOutside}/>