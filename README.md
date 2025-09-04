# Two-Factor Authentication UI in Svelte

[![Svelte](https://img.shields.io/badge/Svelte-5.38.1-FF3E00?style=flat-square&logo=svelte)](https://svelte.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1.12-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-7.1.2-646CFF?style=flat-square&logo=vite)](https://vitejs.dev/)

A modern, responsive two-factor authentication (2FA) UI component built with Svelte and TailwindCSS. This project provides a clean, user-friendly interface for entering 2FA verification codes with animations, validation, and keyboard navigation support.

#### [Desgin Inspiration](https://dribbble.com/shots/10960055-Two-factor-authentication-2FA)


## Installation

```bash
# Clone the repository
git clone https://github.com/XDevRabi/otp-input-ui-svelte
cd otp-input-ui-svelte

# Install dependencies
npm install

# Start the development server
npm run dev
```

## Project Structure

```
├── src/
│   ├── lib/                  # Component library
│   │   ├── otp-form.svelte   # Main OTP form container
│   │   └── otp-input.svelte  # OTP input fields implementation
│   ├── store/                # State management
│   │   └── otpStore.js       # OTP state and validation logic
│   ├── App.svelte            # Root application component
│   ├── app.css               # Global styles and theme variables
│   └── main.js               # Application entry point
├── public/                   # Static assets
└── index.html                # HTML entry point
```

## Component Architecture

### App.svelte
The root component that renders the OTP form and provides a test code for demonstration purposes.

### otp-form.svelte
The main container component that displays:
- Lock icon with dynamic states (default, success, error)
- Title and instructions
- OTP input fields (via OtpInput component)
- Visual feedback with animations based on verification status

### otp-input.svelte
Handles the input fields for the 6-digit code with features:
- Individual digit input fields with focus management
- Keyboard navigation between fields
- Copy/paste functionality
- Visual feedback for validation states
- Submit button with dynamic states

### otpStore.js
Manages the state using Svelte's store:
- `code`: Array of 6 digits entered by the user
- `digitsLeft`: Derived store calculating remaining digits to be entered
- `isCodeComplete`: Derived store indicating if all 6 digits are entered
- `isVerified`: Derived store validating if the entered code matches "628593"

## Implementation Details

### OTP Input Behavior

The OTP input component implements several user-friendly behaviors:

1. **Auto-Focus**: When a digit is entered, focus automatically moves to the next input field
2. **Backspace Navigation**: When backspace is pressed on an empty field, focus moves to the previous field
3. **Visual Feedback**: 
   - Input fields change color based on state (empty, filled, error)
   - Animated cursor indicates the active input field
   - Shake animation when an incorrect code is entered
   - Lock icon changes appearance based on verification status

### State Management

The application uses Svelte's built-in store for state management:

```javascript
// otpStore.js
import { writable, derived } from "svelte/store";

export const code = writable(["", "", "", "", "", ""]);

export const digitsLeft = derived(code, ($code) => 6 - $code.filter(digit => digit !== "").length);
export const isCodeComplete = derived(digitsLeft, $digitsLeft => $digitsLeft === 0);
export const isVerified = derived(code, $code => $code.join("") === "628593");
```

## Keyboard Navigation

The OTP input supports the following keyboard interactions:

- **Tab**: Navigate between input fields
- **Shift + Left/Right Arrow**: Navigate between input fields
- **Backspace**: Delete current digit and move to previous field if empty
- **Ctrl + V**: Paste a code from clipboard (automatically distributes digits)
- **Ctrl + C**: Copy the current code to clipboard
- **Ctrl + X**: Cut the current code and clear all fields

## Customization

The UI uses TailwindCSS for styling. You can customize the appearance by modifying the theme variables in `src/app.css`:

```css
@theme{
  --color-primary-blue: #038aff;
  --color-neutral-1: #e9ebef;
  --color-neutral-2: #777777;
  --color-success: #47ac67;
  --color-error: #ff4259;

  --font-poppins: "Poppins", sans-serif;
  --font-outfit: "Outfit", sans-serif;
}
```

## Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```