---
agent: agent
---
You are refactoring an existing React Native CLI project called NEXUS — a user authentication app. The project already has a working screen flow (Splash → Login → Signup → Reset Password → OTP) but the current UI is generic and inconsistent. Your job is to rebuild every screen and component from scratch to match a precise technical specification, producing a pixel-perfect, professional result.
The full design spec is in the file: NEXUS_UI_Technical_Spec.md — read it completely before writing any code. Every color, font size, spacing value, border radius, and component behavior is defined there. Do not invent or guess any values. If something is in the spec, use it exactly. If something is not in the spec, ask before assuming.

What You Must Do
Step 1 — Set Up the Constants Layer
Create three files that define every design token the app uses. Nothing else in the project should contain hardcoded style values.
/src/constants/Colors.js — Export a single object containing every color token from Section 1 of the spec. Organize it as a nested object matching the token names (e.g., Colors.background.primary, Colors.accent.primary, Colors.social.google). For opacity variants like accent.glow, export them as rgba strings.
/src/constants/Typography.js — Export a single object with every text style from Section 2. Each entry should be a ready-to-use style object containing fontFamily, fontSize, fontWeight, lineHeight, and color where applicable. Example: Typography.heading.screen = { fontFamily: 'Inter', fontSize: 30, fontWeight: '700', lineHeight: 36, color: '#FFFFFF' }.
/src/constants/Spacing.js — Export a single object with every spacing and radius value from Section 3. Simple key-value pairs. Example: Spacing.md = 16, Spacing.radius.input = 12.

Step 2 — Build Every Reusable Component
Create each component exactly as specified in Section 4 of the spec. Each component must be self-contained — it imports its styles from the constants layer only.
/src/components/CustomInput.js

Accepts all props listed in the spec.
Implements all four visual states (default, focused, filled, error) by tracking internal isFocused state via onFocus and onBlur.
The label color and border color/width change dynamically based on the current state.
Renders the eye toggle icon only when showToggle is true. The toggle manages its own internal secureVisible state.
Renders the error message text below the input only when the error prop is a non-null string.
Use TextInput from React Native. Set autoCapitalize="none" and autoCorrect={false} on all instances.

/src/components/CustomButton.js

Accepts title, onPress, disabled, and loading props.
Uses TouchableOpacity with activeOpacity={0.7}.
When disabled is true, set opacity to 0.4 and disable the press handler.
When loading is true, render an ActivityIndicator (white, size "small") centered inside the button instead of the title text.
Fixed height of 52px. Full width. Border radius from Spacing.radius.button.

/src/components/SocialButton.js

Accepts type ("google" or "facebook") and onPress.
Renders the correct brand background color based on type.
Renders the brand icon (from react-native-vector-icons) on the left, then the brand name text on the right.
Icon and text are grouped and centered together within the button using a flex row with alignItems: 'center' and justifyContent: 'center'.
On press, call onPress AND log to console: console.log('[Social Login] Google pressed') or console.log('[Social Login] Facebook pressed').

/src/components/OTPInput.js

Renders four visual boxes and one hidden TextInput positioned absolutely behind them.
The hidden TextInput captures all keyboard input with keyboardType="numeric" and maxLength={4}.
Each visual box checks if its index is less than the current value length to determine filled vs empty state.
The "active" box is the one at index equal to the current value length (or index 3 if all four are filled).
Each box is 56x64px with 12px gaps between them. Digits are 24px bold white, centered.
Accepts value, onChangeText, and error props.

/src/components/ErrorMessage.js

Accepts message, type ("error" or "success"), and visible.
When visible is false, render nothing (return null).
When visible, render a rounded banner with the correct background tint and text color based on type.
Use Animated from React Native to fade in over 250ms when visible changes from false to true.

/src/components/BackButton.js

Renders a left chevron icon (Ionicons chevron-back, 24px, white).
Wrapped in a TouchableOpacity with a 44x44px touch target.
Accepts onPress and calls it on tap.


Step 3 — Build Every Screen
Rebuild each screen file from scratch using only the components from Step 2 and the constants from Step 1. Match the layout structure in Section 5 of the spec exactly — element order, spacing gaps, alignment, and text content must all match.
/src/screens/SplashScreen.js

Full-screen dark background (Colors.background.primary).
Centered logo image + "NEXUS" text with letter-spacing.
Logo has a pulsing glow shadow animation (use Animated — pulse opacity between 0.4 and 0.7 over 2 seconds, looping).
Loading bar at the bottom: 60px wide, 3px tall, animates with translateX from off-screen left to off-screen right, looping every 1.2 seconds.
After 2.5 seconds, call the navigation prop to move to Login. Use useEffect with a timeout. Clear the timeout on unmount.

/src/screens/LoginScreen.js

No back button.
Heading block at the top.
Email input → Password input → Forgot Password link (right-aligned) → Log In button.
Divider with "or continue with" text (the line is drawn with a View, text sits on top with a background matching the screen background to mask the line behind it).
Two SocialButtons side by side in a row with a 12px gap.
Sign Up link at the bottom, centered.
On "Log In" press: run validation. If valid, navigate to Home. If invalid, show error via ErrorMessage component.
On "Forgot Password?" press: navigate to ResetPassword.
On "Sign Up" press: navigate to Signup.

/src/screens/SignupScreen.js

Back button top-left.
"Create Account" heading, centered.
Four inputs stacked: Name, Email, Password, Confirm Password.
Sign Up button.
"Forgot password? Login" link at the bottom.
Validation on Sign Up press: check all fields are filled, email is valid format, passwords match, password meets minimum length. Show the first failing validation as an ErrorMessage.
On successful validation, show a brief success message, then navigate back to Login after 1.5 seconds.

/src/screens/ResetPasswordScreen.js

Back button top-left.
"Reset Password" heading, centered.
Subtitle text (use the corrected version from the spec, not the typo in the mockup).
Single Email input, vertically centered in the remaining space.
"Send Instructions" button.
On press: validate email format. If valid, navigate to OTP. If invalid, show error.

/src/screens/OTPScreen.js

Back button top-left.
Two-line heading: "Verify" and "Verification Code", centered.
Phone illustration icon below the heading (use a simple Ionicons icon like phone-portrait-outline, sized 60px, color accent.primary — or use a custom SVG if available).
Instruction text below the icon.
OTPInput component, centered.
Timer countdown from 60 seconds. Use useEffect with setInterval. When timer hits 0, replace timer text with a "Resend Code" tappable link.
Verify button. Active only when 4 digits are entered.
On Verify press with 4 digits: navigate to Home and clear the auth stack.

/src/screens/HomeScreen.js

A simple placeholder screen. Full dark background. NEXUS logo centered. Text below: "Welcome Home" in white, 24px bold. A "Log Out" button below that navigates back to Login and clears the stack.


Step 4 — Set Up Navigation
/src/navigation/AppNavigator.js

Root navigator. Uses createStackNavigator or createNativeStackNavigator from @react-navigation/native-stack.
Initial route is Splash.
Contains two routes: Splash and Auth (which points to AuthNavigator) and Home.
Splash screen has headerShown: false.
Home screen has headerShown: false.

/src/navigation/AuthNavigator.js

A nested stack navigator containing: Login (initial), Signup, ResetPassword, OTP.
All screens have headerShown: false (you are building custom headers with BackButton).
Login is the base route. Signup, ResetPassword, and OTP are pushed on top.


Step 5 — Validation Checklist Before Finishing
Before considering the implementation complete, verify every item on this list:

 Every color in the app matches a value from Colors.js — no hardcoded hex strings anywhere in screens or components.
 Every font size and weight matches Typography.js.
 Every spacing gap and border radius matches Spacing.js.
 CustomInput shows all four visual states correctly (test by focusing, typing, blurring, and triggering an error).
 The eye toggle on password fields works and switches the icon.
 Social buttons log to the console on press AND the log message is visible.
 OTP boxes highlight the active box correctly as digits are typed.
 The splash animation loops smoothly and the screen transitions after 2.5 seconds.
 The OTP timer counts down and shows "Resend Code" at zero.
 Keyboard avoidance works — inputs are not hidden when the keyboard opens.
 All navigation paths from the flow diagram work correctly (test every arrow).
 The "Forgot password? Login" link on Signup navigates back to Login.
 Validation errors appear and disappear correctly on all forms.
 The app does not crash on any screen or interaction.


What You Must NOT Do

Do not add any backend calls, Firebase, or real OAuth integration. This is UI only.
Do not change the app name or branding — it must remain "NEXUS".
Do not add any screens not listed in the spec.
Do not use any hardcoded style values in screen or component files. Everything comes from the constants layer.
Do not skip any component or screen. Every single one listed above must be implemented.
Do not leave any placeholder comments like // TODO in the final code.
Do not use deprecated React Native APIs. Use current stable versions.