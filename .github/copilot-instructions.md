# NEXUS AuthApp - Copilot Instructions

## Architecture Overview

This is a **React Native 0.83** NEXUS authentication UI app using JavaScript (with TypeScript config). The app implements a complete dark-themed auth flow: Splash → Login → Signup → Reset Password → OTP → Home.

**Key structural decisions:**
- Entry point: [App.tsx](../App.tsx) wraps the app in `GestureHandlerRootView` → `SafeAreaProvider` → `NavigationContainer` → `AuthNavigator`
- Navigation: Stack navigator in [src/navigation/AuthNavigator.js](../src/navigation/AuthNavigator.js)
- All screens use a consistent dark navy background (`#0A0E1A`) with blue accent (`#4A90D9`)
- Design tokens are centralized in `src/constants/` - never hardcode colors, spacing, or typography values

## Design System (NEXUS Theme)

### Constants Layer - ALWAYS import from these files:
```javascript
import Colors from '../constants/Colors';     // Colors.background.primary, Colors.accent.primary, etc.
import Typography from '../constants/Typography'; // Typography.heading.screen, Typography.button, etc.
import Spacing from '../constants/Spacing';   // Spacing.md, Spacing.radius.input, etc.
```

**Key color tokens:**
- `Colors.background.primary`: `#0A0E1A` (main dark navy background)
- `Colors.background.card`: `#141828` (input field backgrounds)
- `Colors.accent.primary`: `#4A90D9` (buttons, links, focus states)
- `Colors.text.primary`: `#FFFFFF` (headings, main text)
- `Colors.text.secondary`: `#8B92A5` (subtitles, labels)
- `Colors.border.default`: `#2A3050` (unfocused input borders)
- `Colors.error.text`: `#E85D5D` (validation errors)

### Component Patterns
- Components in `src/components/` import styles from constants layer only
- `CustomInput`: Supports default/focused/filled/error states, optional eye toggle for passwords
- `CustomButton`: Full width, 52px height, disabled/loading states
- `OTPInput`: 4-box hidden TextInput pattern with visual state per box
- `ErrorMessage`: Supports both error and success types with fade animation

## Form Validation
Validation is UI-only (no backend). Rules:
- **Email**: Basic regex validation on blur
- **Password**: Minimum 6 characters
- **Confirm Password**: Must match password field
- **OTP**: Exactly 4 numeric digits

## Navigation
Screen names: `Splash`, `Login`, `Signup`, `ResetPassword`, `OTP`, `Home`
```javascript
navigation.navigate('OTP', { email: userEmail });
navigation.replace('Home');  // Replace stack for successful auth
navigation.reset({ index: 0, routes: [{ name: 'Login' }] }); // Clear stack on logout
```

## Developer Workflows

### Running the App
```bash
npm install                    # Install dependencies
npx react-native run-android   # Android
npx react-native run-ios       # iOS (macOS only, run pod install first)
npm start                      # Start Metro bundler
```

### Adding a New Screen
1. Create screen in `src/screens/NewScreen.js`
2. Add to stack in [AuthNavigator.js](../src/navigation/AuthNavigator.js)
3. Use `Colors.background.primary` as background, `KeyboardAvoidingView`, and components from `src/components/`

### Adding a New Component
1. Create in `src/components/` with props destructuring
2. Import all styles from `Colors`, `Typography`, `Spacing` constants
3. Never hardcode hex values, font sizes, or spacing numbers

## Mock Authentication
All auth actions simulate success after 1.5s delay. OTP screen accepts any 4 digits.

## Key Dependencies
- `react-native-vector-icons`: Ionicons for input toggles, back buttons
- `@react-navigation/stack`: Screen navigation
- `react-native-safe-area-context`: Safe area handling
- `react-native-gesture-handler`: Touch handling
