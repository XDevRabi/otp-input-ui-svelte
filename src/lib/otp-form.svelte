<script>
  let code = ["", "", "", "", "", ""];
  let inputs = []; // Use to store input field's reference.
  let activeIndex = -1; // to store active input field index.

  $: digitsLeft = 6 - code.filter((digit) => digit !== "").length;
  $: isCodeComplete = digitsLeft === 0;
  $: isVerified = code.join("") === "628593";

  function handleInput(event, index) {
    const value = event.target.value;

    // to allow single digit in a input box.
    if (value.length > 1) {
      event.target.value = value.slice(-1); // to allow last digit
      code[index] = event.target.value; // store the value in the `code` variable
    } else {
      code[index] = value;
    }

    // to auto focus on next input box
    if (value && index < 5) {
      inputs[index + 1].focus();
    }
  }

  function handleKeydown(event, index) {
    // to handle backspace
    if (event.key === "Backspace" && !code[index] && index > 0) {
      inputs[index - 1].focus();
    }

    // to handle paste
    if (event.ctrlKey && event.key.toLowerCase() === "v") {
      event.preventDefault();
      navigator.clipboard.readText().then((text) => {
        const digits = text.replace(/\D/g, "").slice(0, 6); // discard all character which is not digit.
        for (let i = 0; i < 6; i++) {
          code[i] = digits[i] || "";
        }
        // focus the next empty input or last input
        const nextIndex = Math.min(digits.length, 5);
        inputs[nextIndex].focus();
      });
    }

    // to handle copy feature
    if (event.ctrlKey && event.key.toLowerCase() === "c") {
      event.preventDefault();
      navigator.clipboard.writeText(code.join(""));
    }

    // to handle cut feature
    if (event.ctrlKey && event.key.toLowerCase() === "x") {
      event.preventDefault();
      navigator.clipboard.writeText(code.join("")).then(() => {
        code = ["", "", "", "", "", ""];
        inputs[0].focus();
      });
    }

    // shift + (left or right) navigation.
    if (
      event.shiftKey &&
      (event.key === "ArrowLeft" || event.key === "ArrowRight")
    ) {
      event.preventDefault();
      if (event.key === "ArrowLeft" && index > 0) {
        inputs[index - 1].focus();
      }
      if (event.key === "ArrowRight" && index < 5) {
        inputs[index + 1].focus();
      }
    }
  }

  // focus the input box which has been clicked.
  function handleClick(index) {
    inputs[index].focus();
  }
</script>

<div
  class="flex flex-col items-center justify-center rounded-3xl bg-white p-6 md:p-12 shadow-[0_0_50px_0_#038aff1a]"
>
  <!-- Icon part -->
  <div class="flex justify-center mb-6 relative">
    <!-- icons's background pulse effect on success or error -->
    <span
      class="absolute inline-flex h-full w-full rounded-full transition-all
      {!isCodeComplete
        ? ''
        : isVerified
          ? 'bg-success/10 animate-[ping_0.7s_linear]'
          : 'bg-error/10 animate-[ping_0.7s_linear]'}
      "
    ></span>

    <div
      class="size-24 rounded-full flex items-center justify-center relative
      {!isCodeComplete
        ? 'bg-[#e5f3ff]'
        : isVerified
          ? 'bg-[#ecf6ef]'
          : 'bg-[#ffecee]'}
      "
    >
      <svg
        class="
        transition-all duration-300
        {!isCodeComplete
          ? 'text-primary-blue'
          : isVerified
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
          d={isVerified
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

  <!-- otp input field container -->
  <div class={isCodeComplete && !isVerified ? "shake-animation" : ""}>
    <!-- otp input field -->
    <div class="flex justify-center gap-1.5 md:gap-3 my-8">
      {#each code as digit, index}
        <div
          class="relative custom-cursor p-0.5 overflow-clip
            {index === 2 ? 'mr-3 md:mr-5' : ''}
            {activeIndex === index && !digit
            ? 'after:bottom-4'
            : 'after:-bottom-2 after:opacity-0'}
          "
        >
          <input
            bind:this={inputs[index]}
            name="otp-input"
            type="number"
            inputmode="numeric"
            maxlength="1"
            value={digit}
            on:input={(e) => handleInput(e, index)}
            on:keydown={(e) => handleKeydown(e, index)}
            on:click={() => handleClick(index)}
            on:focus={() => (activeIndex = index)}
            on:blur={() => (activeIndex = -1)}
            class="w-10 h-14 md:w-13 md:h-17 border-2 rounded-lg focus:outline-none focus:ring-1 focus:border-transparent text-transparent select-none
                {digit
              ? isCodeComplete && !isVerified
                ? 'border-error text-error bg-error/5 focus:ring-error'
                : 'border-primary-blue text-primary-blue focus:ring-primary-blue'
              : 'border-neutral-1 focus:ring-primary-blue'}"
          />

          <!-- to display input field value with animation -->
          <span
            class="absolute left-1/2 -translate-x-1/2 text-center text-3xl font-normal pointer-events-none transition-all duration-300 ease-in-out
                  {digit ? 'top-1/2 -translate-y-1/2' : '-top-0'}
                  {isCodeComplete && !isVerified
              ? 'text-error'
              : 'text-primary-blue'}"
          >
            {digit}
          </span>
        </div>
      {/each}
    </div>

    <!-- submit button -->
    <button
      class="text-center w-full rounded-xl h-16 font-medium text-lg relative flex justify-center items-center cursor-pointer overflow-clip
      {isCodeComplete && !isVerified ? 'bg-error' : 'bg-neutral-1'}
      "
    >
    <!-- button overlay -->
      <span
        class="absolute transition-all duration-300 ease-in-out top-1/2 -translate-y-1/2 bg-primary-blue w-full h-16 rounded-xl {isVerified
          ? '-right-1/2 -translate-x-1/2'
          : '-right-full -translate-x-0'}"
      ></span>

      <!-- button label -->
      <span class="relative {isCodeComplete ? 'text-white' : 'text-neutral-2'}">
        {isVerified
          ? "Let's go!"
          : isCodeComplete && !isVerified
            ? "Wrong code!"
            : `${digitsLeft} digits left`}
      </span>
    </button>
  </div>
</div>

<style>
  .custom-cursor::after {
    content: "";
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 24px;
    height: 1.2px;
    transition: all 0.3s ease-in-out;
    background-color: var(--color-primary-blue);
  }

  /* Custom animations */
  @keyframes shake {
    0% {
      transform: translateX(0);
    }
    25%,
    75% {
      transform: translateX(-10px);
    }
    50% {
      transform: translateX(10px);
    }
    100% {
      transform: translateX(0);
    }
  }

  .shake-animation {
    animation: shake 0.3s ease-in-out;
  }

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
