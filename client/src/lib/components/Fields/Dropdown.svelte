<script lang="ts" generics="Option extends { displayValue: string, value: string }">

    interface OptionProps {
        options: Option[];
        select(value: string): void;
        placeholder: string;
        name: string;
    }

    let { 
        placeholder, 
        name, 
        options,
        select
    }: OptionProps = $props();

    const onChangeHandler = (e: Event) => {
        select((e?.target as HTMLInputElement)?.value ?? '') 
    }
</script>

<label for={name}>
    <select onchange={onChangeHandler} id={name} name={name} class="min-w-[280px] w-full border-1 border-gray-300 rounded-md p-4">
        <option value="" disabled selected>{ placeholder }</option>
        {#each options as option}
            <option value={option.value}>{option.displayValue}</option>
        {/each}
    </select>
</label>