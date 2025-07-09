<script lang='ts'>
    import Modal from '$lib/components/Modal'
    import Menu from '$lib/components/Menu'
    import Edit from '$lib/components/Post/Edit.svelte'
    import { EllipsisVertical } from 'lucide-svelte';
</script>

<Menu Icon={EllipsisVertical}>
    <ul class="text-center text-lg">
        <li class="border-b-1 border-gray-300 flex justify-center">
            <Modal label={'Edit'} title={"Edit Post"} type={'submit'} form="post-edit">
                <Edit />
            </Modal>
        </li>
        <li>
            <button type="button" class="text-red-600 p-2 font-semibold cursor-pointer">Delete</button>
        </li>
    </ul>
</Menu>