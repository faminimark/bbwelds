<script>
import { Text, Checkbox } from '$lib/components/Fields'
</script>

<div class=" grid grid-cols-2 max-md:flex max-md:flex-col-reverse max-md:h-screen max-md:justify-end">
    <div class="bg-emerald-800 text-white p-15 flex flex-col gap-10">
        <h2 class="text-5xl font-semibold">Hello, Welcome back</h2>
        <div class="flex flex-col text-center gap-4">
            <p>Do not have an account?</p> 
            <a href="/register" class="font-bold border-1 border-white rounded-2xl p-3 w-[120px] self-center">Sign up</a>
        </div>
    </div>
    <div class="flex flex-col gap-7 p-6">
        <form class="flex flex-col gap-3">
            <span class="text-sm text-gray-700">Email</span>
            <Text name="email" placeholder="Email Address" />
            <span class="text-sm text-gray-700">Password</span>
            <Text name="password" placeholder="Password" />
            <Checkbox label="Remember me?" name="remember"/>
            <button class="bg-teal-400 p-5 cursor-pointer font-bold text-white rounded-xs hover:shadow-md hover:bg-teal-300">Login</button>
        </form>
        <div class="relative">
            <hr>
            <div class="absolute w-full top-[-13px] flex justify-center">
                <div class="bg-white w-5 text-center self-center">
                    or
                </div>
            </div>
        </div>
        <div class="flex flex-col">
            <div>
            google
            </div>
            <div>fb</div>
        </div>
    </div>
</div>