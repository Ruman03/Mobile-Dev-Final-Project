# NEXUS Authentication App — Technical UI Specification

**Project:** NEXUS User Authentication App  
**Framework:** React Native CLI  
**Purpose:** Pixel-perfect implementation guide for all screens, components, and navigation flow  
**Version:** 1.0  
**Date:** February 2026

---

## 1. Color Palette & Design Tokens

All colors are defined as a single source of truth. Every component and screen must import from this token file — no hardcoded hex values anywhere in screen or component files.

| Token Name | Hex Code | Usage |
|---|---|---|
| `background.primary` | `#0A0E1A` | Main screen background (deepest dark navy) |
| `background.card` | `#141828` | Input field backgrounds, subtle card surfaces |
| `background.elevated` | `#1E2340` | Slightly raised surfaces, hover/press states |
| `accent.primary` | `#4A90D9` | Primary buttons (Log In, Sign Up, Send Instructions, Verify) |
| `accent.hover` | `#5BA3E8` | Button press/active state |
| `accent.glow` | `#4A90D9` at 40% opacity | Input focus border glow, logo glow on splash |
| `accent.link` | `#4A90D9` | Tappable text links (Forgot Password?, Login, Sign Up) |
| `text.primary` | `#FFFFFF` | Headings, main body text |
| `text.secondary` | `#8B92A5` | Subtitles, labels above inputs |
| `text.placeholder` | `#5A6078` | Placeholder text inside inputs |
| `text.muted` | `#6B7280` | Timers, static non-interactive text |
| `border.default` | `#2A3050` | Input field default border |
| `border.focus` | `#4A90D9` | Input field active/focused border |
| `border.error` | `#E85D5D` | Input field error state border |
| `error.background` | `#E85D5D` at 15% opacity | Error message background tint |
| `error.text` | `#E85D5D` | Error message text color |
| `success.background` | `#4ACD6B` at 15% opacity | Success message background tint |
| `success.text` | `#4ACD6B` | Success message text color |
| `social.google` | `#DB4437` | Google button background |
| `social.facebook` | `#1877F2` | Facebook button background |
| `social.divider` | `#2A3050` | The horizontal line in "or continue with" |

---

## 2. Typography System

Use **Inter** as the primary font family. It is clean, highly legible on mobile at all sizes, and has excellent weight variety. Fall back to the system default sans-serif if Inter is unavailable.

| Style Name | Font Size | Font Weight | Line Height | Usage |
|---|---|---|---|---|
| `heading.splash` | 28px | 700 (Bold) | 34px | NEXUS text on splash screen |
| `heading.screen` | 30px | 700 (Bold) | 36px | Main screen titles (Welcome Back, Create Account, etc.) |
| `heading.otp` | 26px | 700 (Bold) | 32px | OTP screen title (two-line) |
| `subtitle` | 14px | 400 (Regular) | 20px | Screen subtitle/description text |
| `label` | 13px | 500 (Medium) | 18px | Input field labels sitting above each input |
| `input` | 15px | 400 (Regular) | 22px | Text typed inside input fields |
| `placeholder` | 15px | 400 (Regular) | 22px | Placeholder text inside empty inputs |
| `button` | 16px | 600 (SemiBold) | 24px | Text inside primary action buttons |
| `link` | 13px | 500 (Medium) | 18px | Tappable link text |
| `link.inline` | 13px | 600 (SemiBold) | 18px | The colored portion of an inline link (e.g., "Login" in "Already have an account? Login") |
| `timer` | 13px | 400 (Regular) | 18px | OTP countdown timer |
| `otp.digit` | 24px | 700 (Bold) | 30px | Individual digit characters in OTP boxes |

---

## 3. Spacing & Layout Constants

| Token | Value | Usage |
|---|---|---|
| `spacing.xs` | 4px | Minimal micro-spacing |
| `spacing.sm` | 8px | Tight spacing between related elements |
| `spacing.md` | 16px | Standard gap between input fields |
| `spacing.lg` | 24px | Gap between sections (e.g., inputs block to button) |
| `spacing.xl` | 32px | Large gaps (e.g., heading block to first input) |
| `spacing.xxl` | 48px | Extra-large gaps (top padding on content area) |
| `radius.input` | 12px | Border radius on all input fields |
| `radius.button` | 14px | Border radius on primary action buttons |
| `radius.social` | 12px | Border radius on Google/Facebook social buttons |
| `radius.otp` | 14px | Border radius on individual OTP digit boxes |
| `screen.paddingH` | 24px | Horizontal padding on all screens (left and right) |
| `screen.paddingTop` | 60px | Top padding below status bar on inner screens |
| `splash.paddingTop` | 0 | Splash screen is fully centered, no top offset |

---

## 4. Component Specifications

### 4.1 CustomInput

This is the most critical reusable component. Every text field across all screens uses this single component. It must support multiple visual states.

**Props:**

| Prop | Type | Default | Description |
|---|---|---|---|
| `label` | string | required | Text shown above the input |
| `placeholder` | string | required | Greyed-out hint text inside the field |
| `value` | string | `""` | Current input value (controlled) |
| `onChangeText` | function | required | Callback when text changes |
| `secureTextEntry` | boolean | `false` | Masks text for passwords |
| `showToggle` | boolean | `false` | Renders eye icon for password visibility toggle |
| `error` | string or null | `null` | If a string is passed, renders error state + error message below input |
| `keyboardType` | string | `"default"` | `"email-address"`, `"numeric"`, `"phone-pad"`, etc. |
| `onBlur` | function | `null` | Callback on blur — used to trigger validation |

**Visual States:**

| State | Border Color | Border Width | Background | Label Color |
|---|---|---|---|---|
| Default (empty, unfocused) | `border.default` (#2A3050) | 1px | `background.card` (#141828) | `text.secondary` |
| Focused | `border.focus` (#4A90D9) | 1.5px | `background.card` | `accent.primary` (#4A90D9) |
| Filled (has value, unfocused) | `border.default` (#2A3050) | 1px | `background.card` | `text.secondary` |
| Error | `border.error` (#E85D5D) | 1.5px | `background.card` | `error.text` (#E85D5D) |

**Error Message:** When `error` prop is not null, render a small text below the input in `error.text` color, font size 12px, weight 400, with 6px top margin. Optionally prepend a small ⚠ icon.

**Eye Toggle Icon:** Positioned absolutely on the right side of the input, vertically centered. Use `react-native-vector-icons` Ionicons: `eye` when password is hidden, `eye-off` when visible. Icon color is `text.placeholder`. Size 20px.

---

### 4.2 CustomButton

The single primary action button used for Log In, Sign Up, Send Instructions, and Verify.

**Props:**

| Prop | Type | Default | Description |
|---|---|---|---|
| `title` | string | required | Button label text |
| `onPress` | function | required | Tap handler |
| `disabled` | boolean | `false` | If true, renders in disabled state |
| `loading` | boolean | `false` | If true, shows a spinner instead of text |

**Visual States:**

| State | Background | Text Color | Opacity |
|---|---|---|---|
| Default | `accent.primary` (#4A90D9) | White (#FFFFFF) | 1.0 |
| Pressed | `accent.hover` (#5BA3E8) | White (#FFFFFF) | 1.0 |
| Disabled | `accent.primary` (#4A90D9) | White (#FFFFFF) | 0.4 |
| Loading | `accent.primary` (#4A90D9) | Hidden (spinner shown) | 1.0 |

**Dimensions:** Full width of the parent container. Height: 52px. Border radius: 14px. Text is centered, font size 16px, weight 600.

---

### 4.3 SocialButton

Used exclusively on the Login screen for Google and Facebook.

**Props:**

| Prop | Type | Description |
|---|---|---|
| `type` | `"google"` or `"facebook"` | Determines icon and background color |
| `onPress` | function | Tap handler |

**Layout:** Two buttons sit side by side in a row, each taking exactly 50% of the available width minus a 12px gap between them. Height: 52px. Border radius: 12px. Each button has its brand background color. Inside each button: the brand icon on the left (white, 20px), then the brand name text to its right ("Google" or "Facebook") in white, 15px, weight 600. The icon and text are horizontally centered as a group within the button.

**Icons:** Use `react-native-vector-icons` with MaterialLogos or FontAwesome: `google` for Google, `facebook` for Facebook.

---

### 4.4 OTPInput

A row of four individual single-digit input boxes. This is not four separate TextInput components — it is one hidden TextInput that captures keystrokes, overlaid by four visual boxes that display the digits.

**Props:**

| Prop | Type | Description |
|---|---|---|
| `value` | string | The current OTP string (max 4 characters) |
| `onChangeText` | function | Callback when digits change |
| `error` | boolean | If true, all boxes render in error state |

**Visual States per box:**

| State | Border Color | Border Width | Background | Text Color |
|---|---|---|---|---|
| Empty (unfilled) | `border.default` (#2A3050) | 1.5px | `background.card` (#141828) | — |
| Filled | `border.focus` (#4A90D9) | 1.5px | `background.card` | White (#FFFFFF) |
| Active (cursor position) | `border.focus` (#4A90D9) | 2px | `background.card` | — |
| Error | `border.error` (#E85D5D) | 1.5px | `background.card` | `error.text` |

**Dimensions:** Each box is 56px wide and 64px tall. Border radius: 14px. The four boxes have a 12px gap between them. Digits are centered both horizontally and vertically inside each box, font size 24px, weight 700.

---

### 4.5 ErrorMessage / SuccessMessage

A small inline banner that appears below the main heading or above the button area when form submission fails or succeeds.

| Prop | Type | Description |
|---|---|---|
| `message` | string | The text to display |
| `type` | `"error"` or `"success"` | Determines colors |
| `visible` | boolean | Controls show/hide with a subtle fade animation |

**Layout:** Full width. Padding: 10px vertical, 14px horizontal. Border radius: 8px. Background is the tinted version of the color (15% opacity). Text color is the solid version. Font size: 13px, weight 500. Optionally include a small icon on the left (ⓘ for success, ⚠ for error).

---

### 4.6 BackButton

A simple tap target in the top-left corner of inner screens (Login excluded — it has no back button). Uses a left chevron icon from Ionicons (`chevron-back`), size 24px, color white.

**Props:**

| Prop | Type | Description |
|---|---|---|
| `onPress` | function | Navigation callback |

**Dimensions:** 44x44px touch target (accessibility minimum). Icon is visually centered within that area. Positioned at the very top of the screen content area.

---

## 5. Screen-by-Screen Layout Specifications

### 5.1 Splash Screen

**Layout structure (top to bottom, vertically centered):**

The entire content block (logo + text + loading bar) is vertically and horizontally centered on the screen using flexbox `justify-content: center` and `align-items: center`.

- **Logo icon:** The geometric NEXUS "N" mark. Rendered as an SVG or PNG asset. Width: 80px, Height: 80px. Below the icon, apply a subtle vertical glow effect — a blurred blue shadow extending downward (shadow color: `accent.glow`, blur radius: 20px, offset Y: 10px).
- **App name text:** "NEXUS" — rendered below the logo icon with 16px top margin. Font size: 28px, weight 700, color white, letter-spacing: 4px (wide tracking to match the geometric logo style).
- **Loading bar:** Positioned at the very bottom of the screen (not part of the centered block). It is a thin horizontal line, 60px wide, 3px tall, border radius 2px, color `accent.primary`. It animates from left to right using a simple width-based or translateX animation that loops. Center it horizontally. Place it 40px above the bottom edge of the screen.

**Transition:** After 2.5 seconds, navigate automatically to the Login screen.

---

### 5.2 Login Screen

**Layout structure (top to bottom):**

1. **Top spacing:** 60px from the top of the content area.
2. **Heading block:**
   - "Welcome Back" — font size 30px, weight 700, white, left-aligned.
   - "Welcome to authentication." — subtitle, 14px, weight 400, color `text.secondary`, 8px top margin.
3. **Top margin to inputs:** 32px gap between the subtitle and the first input.
4. **Email input:** `CustomInput` with label "Email", placeholder "Email email@gmail.com", keyboardType "email-address".
5. **Gap:** 16px.
6. **Password input:** `CustomInput` with label "Password", placeholder "Password", secureTextEntry, showToggle enabled.
7. **Forgot Password link:** Right-aligned, placed 10px below the password input. Text: "Forgot Password?" — 13px, weight 500, color `accent.link`. Tapping navigates to the Reset Password screen.
8. **Gap:** 24px.
9. **Log In button:** Full-width `CustomButton` with title "Log In".
10. **Divider:** 24px below the button. A horizontal line across the full width with "or continue with" text centered on top of it. The line color is `social.divider`. The text is 12px, color `text.muted`, with a background matching the screen background to "cut" the line behind the text.
11. **Social buttons row:** 16px below the divider. Google and Facebook `SocialButton` components side by side.
12. **Sign Up link:** 24px below the social buttons. Centered text: "Don't have an account? Sign Up". The static portion is 13px, color `text.secondary`. "Sign Up" is 13px, weight 600, color `accent.link`. Tapping "Sign Up" navigates to the Signup screen.

---

### 5.3 Signup Screen (Create Account)

**Layout structure (top to bottom):**

1. **Back button:** Top-left, 60px from top.
2. **Heading:** "Create Account" — 30px, weight 700, white. Centered horizontally. 24px below the back button row.
3. **Gap:** 28px below heading to first input.
4. **Name input:** Label "Name", placeholder "Name".
5. **Gap:** 16px.
6. **Email input:** Label "Email", placeholder "Email email@gmail.com", keyboardType "email-address".
7. **Gap:** 16px.
8. **Password input:** Label "Password", placeholder "Password", secureTextEntry, showToggle.
9. **Gap:** 16px.
10. **Confirm Password input:** Label "Confirm Password", placeholder "Confirm Password", secureTextEntry, showToggle.
11. **Gap:** 28px.
12. **Sign Up button:** Full-width `CustomButton` with title "Sign Up".
13. **Login link:** 20px below the button. Centered: "Forgot password? Login". "Forgot password?" is `text.secondary`, "Login" is `accent.link` weight 600. Tapping "Login" navigates back to Login screen.

---

### 5.4 Reset Password Screen

**Layout structure (top to bottom):**

1. **Back button:** Top-left, 60px from top.
2. **Heading:** "Reset Password" — 30px, weight 700, white. Centered. 24px below back button row.
3. **Subtitle:** "Enter your email address to reset your password." — 14px, color `text.secondary`, centered, 10px below heading. (Note: Fix the typo from the mockup — "add iweed" should read "address".)
4. **Gap:** 32px below subtitle.
5. **Email input:** Label "Email", placeholder "Email", keyboardType "email-address". Centered in the available vertical space.
6. **Gap:** 28px.
7. **Send Instructions button:** Full-width `CustomButton` with title "Send Instructions". On press, navigates to the OTP screen.

---

### 5.5 OTP Screen (Verify Verification Code)

**Layout structure (top to bottom):**

1. **Back button:** Top-left, 60px from top.
2. **Heading:** "Verify" on line one, "Verification Code" on line two — 26px, weight 700, white, centered. This is intentionally two lines due to screen width. 24px below back button row.
3. **Phone illustration:** A simple outlined phone icon or illustration in `accent.primary` color, centered. Approximately 80x100px. 20px below the heading. This should be a simple SVG icon, not a photograph — keep it consistent with the geometric NEXUS design language.
4. **Instruction text:** "Enter your code to verify verification code." — 13px, color `text.secondary`, centered, 16px below the illustration. (This text is from the mockup — consider simplifying to "Enter the code sent to your email." for clarity.)
5. **Gap:** 24px.
6. **OTP digit boxes:** The `OTPInput` component, centered horizontally. Four boxes in a row.
7. **Timer:** "Timer: 00:58" — centered below the OTP boxes, 12px top margin. "Timer:" is optional — can just show "00:58". Font size 13px, color `text.muted`. The timer counts down from 60 seconds. When it reaches 00:00, show a "Resend Code" link in `accent.link` color in its place.
8. **Gap:** 28px.
9. **Verify button:** Full-width `CustomButton` with title "Verify". On successful verification (all 4 digits entered and valid), navigate to the Home/Main App screen.

---

## 6. Navigation Flow

This section maps directly to the user flow diagram. Every navigation action is listed with its trigger and destination.

| From Screen | Trigger | To Screen | Transition Type |
|---|---|---|---|
| Splash | Auto after 2.5s | Login | Fade or replace (no back gesture) |
| Login | Tap "Log In" (success) | Home (Main App) | Push |
| Login | Tap "Forgot Password?" | Reset Password | Push |
| Login | Tap "Sign Up" | Signup | Push |
| Signup | Tap back button | Login | Pop |
| Signup | Tap "Login" link | Login | Pop |
| Signup | Tap "Sign Up" (success) | Login | Pop (back to login after success toast) |
| Reset Password | Tap back button | Login | Pop |
| Reset Password | Tap "Send Instructions" | OTP | Push |
| OTP | Tap back button | Reset Password | Pop |
| OTP | Tap "Verify" (success) | Home (Main App) | Replace (clear stack) |

**Stack structure:** Splash is the initial route and should be removed from the stack after transition. Login is the base of the auth stack. Signup, Reset Password, and OTP are pushed on top of Login. Home replaces the entire auth stack on successful login or OTP verification.

---

## 7. Animation & Interaction Details

| Element | Animation | Details |
|---|---|---|
| Splash logo glow | Pulse | Subtle opacity pulse on the glow shadow: 0.4 → 0.7 → 0.4, duration 2s, loop |
| Splash loading bar | Slide | translateX from -60px to screen width, duration 1.2s, ease-in-out, loop |
| Input focus | Border color transition | Animate border color from `border.default` to `border.focus` over 200ms |
| Input error | Border color + shake | Border turns red over 150ms. A horizontal shake animation (translateX ±6px, 3 cycles, 300ms total) plays once when error first appears |
| Button press | Opacity or color shift | Background briefly shifts to `accent.hover` on press, 100ms |
| Error/Success message | Fade + slide | Fades in and slides down 8px into position over 250ms. Fades out over 200ms when dismissed |
| Screen transitions | Default React Navigation | Use the default push/pop slide animations |
| OTP box focus | Border width increase | Active box border animates from 1.5px to 2px over 150ms |

---

## 8. File & Folder Structure

```
/src
  /screens
    SplashScreen.js
    LoginScreen.js
    SignupScreen.js
    ResetPasswordScreen.js
    OTPScreen.js
    HomeScreen.js          ← Placeholder main app screen (simple branded screen)
  /components
    CustomInput.js
    CustomButton.js
    SocialButton.js
    OTPInput.js
    ErrorMessage.js        ← Reusable for both error and success states
    BackButton.js
  /navigation
    AppNavigator.js        ← Main navigation stack setup
    AuthNavigator.js       ← Auth flow stack (Login → Signup, ResetPassword, OTP)
  /constants
    Colors.js              ← All design tokens (hex values, opacity variants)
    Typography.js          ← All font sizes, weights, line heights
    Spacing.js             ← All spacing and radius constants
  /assets
    /icons
      nexus-logo.png       ← The geometric N logo mark
      nexus-logo.svg       ← SVG version if available
    /fonts
      Inter-Regular.ttf
      Inter-Medium.ttf
      Inter-SemiBold.ttf
      Inter-Bold.ttf
```

---

## 9. Key Implementation Notes

**Input validation rules (UI feedback only — no backend):**
- Email fields: Must match a basic email regex pattern. Show error "Please enter a valid email address" on blur if invalid.
- Password field on Signup: Minimum 6 characters. Show error "Password must be at least 6 characters" if too short.
- Confirm Password on Signup: Must match the Password field. Show error "Passwords do not match" if they differ.
- OTP field: Only numeric input allowed (keyboardType "numeric"). Must be exactly 4 digits before the Verify button becomes active.

**Social login buttons:** On press, log to console with a clear message (e.g., `console.log("Google Sign In pressed")`) and optionally show a brief success toast or message on screen to demonstrate the interaction is registered. Do not leave the button completely silent.

**Password visibility toggle:** Tapping the eye icon toggles `secureTextEntry` between true and false on that specific input instance only. The icon should switch between `eye` and `eye-off` instantly (no animation needed).

**Keyboard avoidance:** Wrap all screen content in a `KeyboardAvoidingView` with `behavior="padding"` (iOS) or `behavior="height"` (Android) so input fields are not hidden behind the software keyboard.

**Font loading:** Use `react-native-asset-library` or include fonts via the standard React Native CLI font linking process. Ensure Inter font files are linked before the app renders. Fall back to the system sans-serif if loading fails.