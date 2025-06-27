<script lang="ts">
    import {Text, TextArea} from '$lib/components/Fields'
    import {LeftAligned} from '$lib/components/Dividers'
    import Certificate from './Certificate.svelte';
    import { findContact } from '$lib/utils';
    import { enhance } from '$app/forms';

    const { user } = $props()
    const phone = findContact(user.contacts, 'phone')
    const email = findContact(user.contacts, 'email')
    const location = user.locations
</script>

<form id="profile-edit" method="POST" action='?/edit' class="flex flex-col gap-4" use:enhance>
    <div class="flex gap-3 max-sm:flex-col">
        <Text name="f_name" placeholder={"First name"}  value={user.f_name}/>
        <Text name="l_name" placeholder={"Last name"} value={user.l_name}/>
    </div>
    <Text name="job_title" placeholder={"Title"} value={user.job_title}/>
    <TextArea name="profile_description" placeholder={"Tell us about you"}  value={user.profile_description}/>
    <LeftAligned text="Contact"/>
    <Text name="phone" placeholder={"Phone"} value={phone}/>
    <Text name="email" placeholder={"Email"} value={email}/>
    <LeftAligned text="Location"/>
    <div class="flex gap-3 max-sm:flex-col">
        <Text name="city" placeholder={"City"} value={location.city}/>
        <Text name="state_region" placeholder={"State/Region"} value={location.state_region}/>
    </div>
    <div class="flex gap-3 max-sm:flex-col">
        <Text name="zip_postal" placeholder={"Zip/Postal Code"} value={location.zip_postal}/>
        <Text name="country" placeholder={"Country"} value={location.country}/>
    </div>
    
    <!-- <LeftAligned text="Certificates"/>
    <Certificate /> -->
</form>