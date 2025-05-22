<script lang="ts">
    import Card from "$lib/components/Card.svelte";
    import { Text, Checkbox } from "$lib/components/Fields"
    import { backHandler, validateEmail } from '$lib/utils'
    import client from '$lib/utils/ApiClient'
    const logo = '/build-bard-logo.svg';

    let termsAccepted = $state(false);
    let errors: {
        email: null | string;
        confirmPassword: null | string;
    } = {
        email: null,
        confirmPassword: null

    };


    const handleRegister = async (event: SubmitEvent & { currentTarget: EventTarget & HTMLFormElement}) => {
        event.preventDefault();
        const form = new FormData(event.currentTarget);
        const email = form.get('email')?.toString() ?? ''
        const password = form.get('password')
        const confirmPassword = form.get('confirm-password')

        errors.email = validateEmail(email)
        if(password !== confirmPassword) errors.confirmPassword = 'Confirm password does not match the password.'
        if(errors.email || errors.confirmPassword) return;

        const data = Object.fromEntries(form);
        const response = client.post('user/create', {data});

    }
</script>

<div class="p-8 flex w-full flex-col gap-8">
    <img alt="logo" src={logo} class="h-[140px] self-center"/>
    <Card>
        <form class="flex flex-col gap-3" onsubmit={handleRegister}>
            <div class="flex gap-5 max-sm:flex-col max-sm:gap-3">
                    <Text name={'fname'} placeholder={'First Name'} max={50} required />
                    <Text name={'lname'} placeholder={'Last Name'} max={50} required />
            </div>
            <div>
                <Text name={'email'} placeholder={'Email'} required bind:error={errors.email}/>
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
