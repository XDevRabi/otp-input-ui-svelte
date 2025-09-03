<script>
  import OtpForm from "./lib/otp-form.svelte";
</script>

<main class="w-full h-screen flex flex-col justify-center items-center">
  <OtpForm />

  <div class="flex gap-2 items-center mt-6 text-gray-500">
    <p class="text-center leading-0">
      (Please enter 628593 as test OTP) or copy from here.
    </p>
    <button
      aria-label="Copy OTP"
      on:click={() => {
        navigator.clipboard.writeText("628593");
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="cursor-pointer"
        ><rect width="14" height="14" x="8" y="8" rx="2" ry="2" /><path
          d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"
        /></svg
      >
    </button>
  </div>
</main>
