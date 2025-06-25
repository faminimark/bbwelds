<script lang="ts">
    import {Select, Text} from '$lib/components/Fields'
</script>


<div class="flex gap-3 max-sm:flex-col">
    <Text name="name" placeholder="Certificate name"/>
    <Text name="description" placeholder="Expiration MM/YYYY"/>
    <Select name="type" placeholder="Choose type" options={[{displayValue: 'License', value: 'license'} , {displayValue: 'Certificate', value: 'certification'}]}/>
</div>