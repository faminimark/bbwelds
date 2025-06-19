<script lang="ts" generics="Option extends { displayValue: string, value: string }">
    import { X } from 'lucide-svelte'

    interface OptionProps {
        options: Option[];
        placeholder: string;
        name: string;
    }

    let { 
        placeholder, 
        name, 
        options,
    }: OptionProps = $props();
    
    let displaySelected: string[] = $state([])
    let valueSelected: string[] = $state([])
    let focused = $state(false)

    const handleSelect = (event: { currentTarget: { value: any; }; }) => {
        const { value, displayValue} = options[event?.currentTarget?.value];
        if(displaySelected.includes(displayValue)){
            displaySelected = displaySelected.filter((d) => d !== displayValue)
            valueSelected = valueSelected.filter((v) => v !== value) 
        } else {
            displaySelected.push(displayValue)
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
        displaySelected.splice(index, 1)
        valueSelected.splice(index, 1)

        displaySelected = displaySelected
        valueSelected = valueSelected
    }

    const availableOptions = $derived(
        options.filter(option => !valueSelected.includes(option.value))
    )
</script>

<div class="relative bg-white picker-popup">
    <label for={name}>
        <input name="display" type="text" class="min-w-[280px] w-full border-1 border-gray-300 rounded-md p-4 capitalize" readonly placeholder="{!displaySelected.length ? placeholder : ''}" onfocus={() => focused = true}/>
        <div class="absolute top-0 p-3 flex flex-row flex-wrap align-middle gap-2">
            {#each displaySelected as selected, index}
                <button type="button" value={index} onclick={toggleSelect} class="font-semibold text-gray-500 max-sm:text-sm border-gray-400 border-1 shadow-md p-1 px-3 rounded-xs text-nowrap capitalize cursor-pointer flex">{selected} <X size="15"/></button>
            {/each}
        </div>
        <input type="text" id={name} name={name} class="hidden" placeholder="{placeholder}" bind:value={valueSelected}/>
    </label>

    {#if focused}
    <div class="absolute top-15 bg-white w-full gap-4 py-3 px-5 border-1 overflow-auto border-gray-300 rounded-xs flex flex-row justify-between z-[20]">
        <div class="flex flex-row gap-2 flex-wrap ">
            {#each availableOptions as option}
                <button 
                    type="button" 
                    value={options.findIndex(o => o.value === option.value)} 
                    onclick={handleSelect} 
                    class="font-semibold text-gray-500 max-sm:text-sm border-gray-400 border-1 shadow-md p-1 px-3 rounded-xs text-nowrap capitalize cursor-pointer"
                >
                    {option.displayValue}
                </button>
            {/each}
        </div>
        <div>
            <button type="button" onclick={() => focused = false} class="font-semibold text-xs text-gray-500 max-sm:text-sm text-nowrap capitalize cursor-pointer"><X/></button>
        </div>
    </div>
    {/if}
</div>

<svelte:window onclick={handleClickOutside}/>