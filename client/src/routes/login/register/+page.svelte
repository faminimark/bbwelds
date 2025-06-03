<script lang="ts">
  import { enhance } from "$app/forms";
    import Card from "$lib/components/Card.svelte";
    import { Text, Checkbox } from "$lib/components/Fields"
    import { backHandler, } from '$lib/utils'
    const logo = '/bb-logo.svg';

    let termsAccepted = $state(false);

    let { form } = $props()
    let errors: {
        email: null | string;
        confirmPassword: null | string;
    } = {
        email: null,
        confirmPassword: null

    };

</script>

<div class="p-8 flex w-full flex-col gap-8">
    <img alt="logo" src={logo} class="h-[140px] self-center"/>
    <Card>
        <form class="flex flex-col gap-3" method="POST" use:enhance>
            {#if form?.message}<p class="text-red-600 text-sm">{form?.message}</p>{/if}
            <div class="flex gap-5 max-sm:flex-col max-sm:gap-3">
                    <Text name={'fname'} placeholder={'First Name'} max={50} required />
                    <Text name={'lname'} placeholder={'Last Name'} max={50} required />
            </div>
            <div>
                <Text name={'email'} placeholder={'Email'} required/>
            </div>
            <div>
                <Text name={'password'} placeholder={'Password'} type="password" required/>
            </div>
            <div>
                <Text name={'confirm-password'} placeholder={'Confirm Password'} type="password" required error={errors.confirmPassword}/>
            </div>
            <hr />
            <div>
                <Text name={'company'} placeholder={'Company (if applicable)'} max={100} />
            </div>
            <div>
                <Text name={'city'} placeholder={'City'} required/>
            </div>
            <div>
                <Text name={'state'} placeholder={'State'}  required/>
            </div>
            <div>
                <Text name={'country'} placeholder={'Country'}  required/>
            </div>
            <div>
                <Text name={'zip'} placeholder={'Zip'} max={15} required/>
            </div>
            <div>
                <Checkbox bind:checked={termsAccepted} label={'Do you accept the <a href="/terms" class="text-blue-400">terms of service</a>?'} name={'terms'}/>
            </div>

            <div class="flex gap-5 justify-end">
                <button type="button" class="cursor-pointer text-gray-400 hover:bg-gray-100 p-3 rounded-xs" onclick={backHandler}>Back to Login</button>
                <button type="submit" class=" p-3 rounded-xs text-white font-semibold {termsAccepted ? 'bg-teal-400 hover:bg-teal-300 cursor-pointer' : 'bg-gray-400'}" disabled={!termsAccepted}>Register</button>
            </div>
        </form>
    </Card>
</div>
