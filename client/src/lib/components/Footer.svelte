<script lang="ts">
    const year = new Date().getFullYear();
</script>

<footer class='bg-gray-800 text-white w-full p-15 flex flex-col gap-12'>
    <section class="gap-7 flex  justify-between">
        <ul>
            <li>About</li>
            <li>FAQs</li>
            <li>Support</li>
            <li>Press</li>
        </ul>

        <ul>
            <li>FAQs</li>
            <li>Advertise</li>
        </ul>

        <div class="gap-2 flex flex-col">
            <h4 class="font-semibold">Follow us</h4>
            <ul>
                <li>Facebook</li>
                <li>Instagram</li>
                <li>X</li>
            </ul>
        </div>

        <div></div>
    </section>

    <div class="flex flex-row gap-7">
        <div>&copy; {year} bbwelds </div>
        <ul class="flex flex-row gap-5">
            <li>Terms</li>
            <li>Privacy</li>
            <li>Cookies</li>
        </ul>
    </div>
</footer>