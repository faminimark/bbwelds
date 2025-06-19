<script lang="ts">
    import {Text, TextArea} from '$lib/components/Fields'
    import {LeftAligned} from '$lib/components/Dividers'
</script>

<form action="" method="POST" class="flex flex-col gap-4">
    <div class="flex gap-3 max-sm:flex-col">
        <Text name="f_name" placeholder={"First name"} />
        <Text name="l_name" placeholder={"Last name"} />
    </div>
    <TextArea name="profile_description" placeholder={"Tell us about you"} />
    <LeftAligned text="Contact"/>
    <Text name="phone" placeholder={"Phone"} />
    <Text name="email" placeholder={"Email"} />
    <LeftAligned text="Location"/>
    <Text name="city" placeholder={"City"} />
    <Text name="state_region" placeholder={"State/Region"} />
    <Text name="zip_postal" placeholder={"Zip/Postal Code"} />
    <Text name="country" placeholder={"Country"} />
    <LeftAligned text="Certificates"/>
    <Text name="certificates" placeholder="Certificates"/>
    <Text name="licences" placeholder="License #"/>
</form>