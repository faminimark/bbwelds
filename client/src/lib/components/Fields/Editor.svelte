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
        autofocus={false}
        extensions={customExtensions}
        body={value}
        bind:tipex={editor}
        floating
        style="background-color: white;"
        class="h-[50vh] border border-gray-300" 
        >
            {#snippet utilities(tipex)}
                <!-- N/A -->
            {/snippet}
    </Tipex>
</div>
