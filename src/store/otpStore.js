import { writable, derived } from "svelte/store";

export const code = writable(["", "", "", "", "", ""]);

export const digitsLeft = derived(code, ($code) => 6 - $code.filter(digit => digit !== "").length);
export const isCodeComplete = derived(digitsLeft, $digitsLeft => $digitsLeft === 0);
export const isVerified = derived(code, $code => $code.join("") === "628593");
