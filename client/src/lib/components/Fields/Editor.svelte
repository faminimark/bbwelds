<script lang="ts">
    import {Tipex, type TipexEditor} from "@friendofsvelte/tipex"
    import Placeholder from '@tiptap/extension-placeholder'
    import Paragraph from '@tiptap/extension-paragraph'
    import type { Extensions } from '@tiptap/core';
    let {name, value = undefined} = $props()
    let editor: TipexEditor = $state()
    const htmlContent = $derived(editor?.getHTML())

  const customExtensions: Extensions = [
        Placeholder.configure({placeholder: 'Tell us your build story ...'}),
        Paragraph.configure({
            HTMLAttributes: {
                class: 'py-2'
            }
        })
    ]
</script>

<div>
    <input {name} id={name} type="text" value={htmlContent} class="hidden"/>
    <Tipex
        focal={false}
        autofocus={false}
        extensions={customExtensions}
        body={value}
        bind:tipex={editor}
        floating
        style="background-color: white; border-color: #d1d5dc;"
        class="h-[50vh] foooo" 
        >
            {#snippet utilities(tipex)}
                <!-- N/A -->
            {/snippet}
    </Tipex>
</div>

<style>
    .foooo:focus {
        border-color: var(--color-gray-600)
    }
</style>