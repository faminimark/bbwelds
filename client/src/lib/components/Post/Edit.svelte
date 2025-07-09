<script lang="ts">
    import {Picker, Text, Editor} from '$lib/components/Fields'
    import { enhance } from '$app/forms';

</script>

<form id="post-edit" method="POST" action='?/edit' class="flex flex-col gap-4" use:enhance>
    <Text name="title" placeholder={"Title"} value={''}/>
    <!-- Images goes here -->
    <Editor name="description" value={''}/>
    <Picker name="phone" placeholder={'Pick at least 1 tag'} values={['cool', 'collected']}/>
</form>