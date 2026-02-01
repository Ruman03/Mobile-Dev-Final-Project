# AuthApp - React Native Authentication UI

A complete user authentication interface for React Native with modern design, smooth animations, and accessibility focus.

## Features

- **5 Beautiful Screens**: Splash, Login, Signup, Forgot Password, OTP Verification
- **6 Reusable Components**: CustomInput, CustomButton, ErrorMessage, SuccessMessage, PasswordStrengthIndicator, SocialButton
- **Modern UI/UX**: Gradient backgrounds, floating labels, smooth animations
- **Form Validation**: Real-time validation with visual feedback
- **Accessibility**: Proper accessibility labels and focus indicators

## Screenshots

The app includes:
- Splash screen with animated logo and gradient background
- Login with social login options (Google, Facebook)
- Signup with password strength indicator
- Forgot Password with email validation
- OTP verification with 6-digit input and countdown timer

## Project Structure

```
src/
├── components/
│   ├── CustomButton.js
│   ├── CustomInput.js
│   ├── ErrorMessage.js
│   ├── PasswordStrengthIndicator.js
│   ├── SocialButton.js
│   └── SuccessMessage.js
├── navigation/
│   └── AuthNavigator.js
├── screens/
│   ├── ForgotPasswordScreen.js
│   ├── LoginScreen.js
│   ├── OTPScreen.js
│   ├── SignupScreen.js
│   └── SplashScreen.js
├── styles/
│   ├── colors.js
│   ├── spacing.js
│   └── typography.js
├── types/
│   └── index.d.ts
└── utils/
    └── validation.js
```

## Installation

1. **Install dependencies**:
   ```bash
   cd AuthApp
   npm install
   ```

2. **For iOS** (macOS only):
   ```bash
   cd ios && pod install && cd ..
   ```

3. **Link vector icons** (React Native < 0.60):
   ```bash
   npx react-native link react-native-vector-icons
   ```

## Running the App

### Android
```bash
npx react-native run-android
```

### iOS
```bash
npx react-native run-ios
```

## Dependencies

- `@react-navigation/native` - Navigation container
- `@react-navigation/stack` - Stack navigator
- `react-native-gesture-handler` - Gesture handling
- `react-native-linear-gradient` - Gradient backgrounds
- `react-native-safe-area-context` - Safe area handling
- `react-native-screens` - Native screen optimization
- `react-native-vector-icons` - Icon library

## Color Scheme

| Color | Hex | Usage |
|-------|-----|-------|
| Primary | `#6C5CE7` | Buttons, links, accent |
| Secondary | `#00CEC9` | Secondary actions |
| Error | `#E74C3C` | Validation errors |
| Success | `#00B894` | Success messages |

## Validation Rules

- **Email**: Valid format with @ symbol
- **Password**: Min 8 chars, 1 uppercase, 1 lowercase, 1 number
- **Phone**: 10-15 digits (optional)
- **OTP**: 6 digits, numeric only

## Mock Authentication

For testing, the OTP screen accepts `123456` as a valid code. All other authentication is mocked to simulate success after a brief loading delay.

## License

MIT License
