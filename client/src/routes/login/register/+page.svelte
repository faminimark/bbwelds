<script lang="ts">
    import Card from "$lib/components/Card.svelte";
    import { Text, Checkbox } from "$lib/components/Fields"
    import { backHandler } from '$lib/utils'
    import client from '$lib/utils/ApiClient'
    const logo = '/build-bard-logo.svg';

    let termsAccepted = $state(false);

    const handleRegister = async (event: SubmitEvent & { currentTarget: EventTarget & HTMLFormElement}) => {
        const form = new FormData(event.currentTarget);
        console.log(event.currentTarget);
        
 const data = Object.fromEntries(form);

        const response = client.post('user/create', {data});

    }
</script>

<div class="p-8 flex w-full flex-col gap-8">
    <img alt="logo" src={logo} class="h-[140px] self-center"/>
    <Card>
        <form class="flex flex-col gap-3" onsubmit={handleRegister}>
            <div class="flex gap-5 max-sm:flex-col max-sm:gap-3">
                    <Text name={'fname'} placeholder={'First Name'} max={50} />
                    <Text name={'lname'} placeholder={'Last Name'} max={50} />
            </div>
            <div>
                <Text name={'email'} placeholder={'Email'} />
            </div>
            <div>
                <Text name={'password'} placeholder={'Password'} type="password"/>
            </div>
            <div>
                <Text name={'confirm-password'} placeholder={'Confirm Password'} type="password"/>
            </div>
            <hr />
            <div>
                <Text name={'company'} placeholder={'Company (if applicable)'} max={100} />
            </div>
            <div>
                <Text name={'city'} placeholder={'City'} />
            </div>
            <div>
                <Text name={'state'} placeholder={'State'}  />
            </div>
            <div>
                <Text name={'country'} placeholder={'Country'}  />
            </div>
            <div>
                <Text name={'zip'} placeholder={'Zip'} max={15} />
            </div>
            <div>
                <Checkbox bind:checked={termsAccepted} label={'Do you accept the <a href="/terms" class="text-blue-400">terms of service</a>?'} name={'terms'}/>
            </div>
            
            <div class="flex gap-5 justify-end">
                <button class="cursor-pointer text-gray-400 hover:bg-gray-100 p-3 rounded-xs" onclick={backHandler}>Back to Login</button>
                <button class=" p-3 rounded-xs text-white font-semibold {termsAccepted ? 'bg-teal-400 hover:bg-teal-300 cursor-pointer' : 'bg-gray-400'}" disabled={!termsAccepted}>Register</button>
            </div>
        </form>
    </Card>
</div>
