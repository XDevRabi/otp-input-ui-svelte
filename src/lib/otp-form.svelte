<script>
  import OtpInput from "./otp-input.svelte";
  import { isCodeComplete, isVerified } from "../store/otpStore.js";
</script>

<div
  class="flex flex-col items-center justify-center rounded-3xl bg-white p-6 md:p-12 shadow-[0_0_50px_0_#038aff1a]"
>
  <!-- Icon part -->
  <div class="flex justify-center mb-6 relative">
    <!-- icons's background pulse effect on success or error -->
    <span
      class="absolute inline-flex h-full w-full rounded-full transition-all
      {!$isCodeComplete
        ? ''
        : $isVerified
          ? 'bg-success/10 animate-[ping_0.7s_linear]'
          : 'bg-error/10 animate-[ping_0.7s_linear]'}
      "
    ></span>

    <div
      class="size-24 rounded-full flex items-center justify-center relative
      {!$isCodeComplete
        ? 'bg-[#e5f3ff]'
        : $isVerified
          ? 'bg-[#ecf6ef]'
          : 'bg-[#ffecee]'}
      "
    >
      <svg
        class="
        transition-all duration-300
        {!$isCodeComplete
          ? 'text-primary-blue'
          : $isVerified
            ? 'text-success'
            : 'text-error bounce-animation'}
        "
        width="50"
        height="48"
        viewBox="0 0 24 25"
        fill="none"
        stroke="currentColor"
      >
        <path
          d={$isVerified
            ? "M16 9V5C16 2.79086 17.7909 1 20 1V1C22.2091 1 24 2.79086 24 5V9"
            : "M16 9V5C16 2.79086 14.2091 1 12 1V1C9.79086 1 8 2.79086 8 5V9"}
          class={"transition-all duration-300"}
          stroke-linecap="round"
        />
        <circle cx="12" cy="15" r="1" stroke-linejoin="round" />
        <path d="M12 16.5V19.979" stroke-linejoin="round" />
        <circle cx="12" cy="16" r="8" stroke-linejoin="round" />
      </svg>
    </div>
  </div>

  <h1 class="text-4xl font-semibold text-center mb-4">Easy peasy</h1>

  <p class="text-neutral-2 text-center mb-2 text-sm">
    Enter 6-digit code from your two factor authenticator APP
  </p>

  <OtpInput />
</div>

<style>
  @keyframes bounce {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.15);
    }
    100% {
      transform: scale(1);
    }
  }

  .bounce-animation {
    animation: bounce 0.5s ease-in-out;
  }
</style>
