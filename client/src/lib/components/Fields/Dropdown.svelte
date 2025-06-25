<script lang="ts" generics="Option extends { displayValue: string, value: string }">

    interface OptionProps {
        options: Option[];
        select?(value: string): void;
        placeholder: string;
        name: string;
    }

    let { 
        placeholder, 
        name, 
        options,
        select = undefined
    }: OptionProps = $props();

    const onChangeHandler = (e: Event) => {
        if(select) select((e?.target as HTMLInputElement)?.value ?? '') 
    }
</script>

<label for={name} class="min-w-[280px] w-full border-1 border-gray-300 rounded-md">
    <select onchange={onChangeHandler} id={name} name={name} class="w-full border-r-6 border-r-transparent p-4">
        <option value="" disabled selected>{ placeholder }</option>
        {#each options as option}
            <option value={option.value}>{option.displayValue}</option>
        {/each}
    </select>
</label>