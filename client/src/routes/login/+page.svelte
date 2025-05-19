<script>
import { Text, Checkbox } from '$lib/components/Fields'
const facebookLogo = '/facebook.svg';
const googleLogo = '/google.svg';
</script>

<div class="grid grid-cols-2 max-md:flex max-md:flex-col-reverse max-md:h-screen max-md:justify-end">
    <div class="flex flex-col gap-7 p-6">
        <a href="/login/register" class="font-bold border-1 border-black rounded-2xl p-3 w-[120px] text-center self-end hidden max-md:block">Sign up</a>
        <form class="flex flex-col gap-3" method="POST" >
            <span class="text-sm text-gray-700">Email</span>
            <Text name="email" placeholder="Email Address" />
            <span class="text-sm text-gray-700">Password</span>
            <Text name="password" placeholder="Password" />
            <Checkbox label="Remember me?" name="remember"/>
            <button class="bg-teal-400 p-5 cursor-pointer font-bold text-white rounded-xs hover:shadow-md hover:bg-teal-300">Log in</button>
        </form>
        <div class="relative">
            <hr>
            <div class="absolute w-full top-[-16px] flex justify-center">
                <div class="bg-white w-8 text-center self-center text-xl">
                    or
                </div>
            </div>
        </div>
        <div class="flex flex-col gap-4">
            <button  aria-label="Login with Facebook" class="bg-black p-5 cursor-pointer font-bold text-white rounded-xs hover:shadow-md hover:bg-gray-800 justify-center flex flex-row gap-1 align-middle">
                <img src={googleLogo} alt="Google logo" class="w-[24px] h-[24px]"/> Sign in with Google
            </button>
            <button aria-label="Login with Facebook" class="bg-blue-400 p-5 cursor-pointer font-bold text-white rounded-xs hover:shadow-md hover:bg-blue-300 justify-center flex flex-row gap-1 align-middle">
                <img src={facebookLogo} alt="Facebook logo" class="w-[24px] h-[24px]"/> Log in with Facebook
            </button>
        </div>
    </div>
       <div class="bg-emerald-800 text-white p-15 flex flex-col gap-10 max-md:hidden">
        <h2 class="text-5xl font-semibold text-center">Hello, Welcome back</h2>
        <div class="flex flex-col text-center gap-4">
            <p>Do not have an account?</p> 
            <a href="/login/register" class="font-bold border-1 border-white rounded-2xl p-3 w-[120px] self-center">Sign up</a>
        </div>
    </div>
</div>