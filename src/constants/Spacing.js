// NEXUS Design System - Spacing & Layout Tokens

const Spacing = {
    // Base Spacing Units
    xs: 4,      // Minimal micro-spacing
    sm: 8,      // Tight spacing between related elements
    md: 16,     // Standard gap between input fields
    lg: 24,     // Gap between sections (e.g., inputs block to button)
    xl: 32,     // Large gaps (e.g., heading block to first input)
    xxl: 48,    // Extra-large gaps (top padding on content area)

    // Border Radius
    radius: {
        input: 12,   // Border radius on all input fields
        button: 14,  // Border radius on primary action buttons
        social: 12,  // Border radius on Google/Facebook social buttons
        otp: 14,     // Border radius on individual OTP digit boxes
        message: 8,  // Border radius on error/success message banners
    },

    // Screen Layout
    screen: {
        paddingH: 24,    // Horizontal padding on all screens (left and right)
        paddingTop: 60,  // Top padding below status bar on inner screens
    },

    // Splash Screen
    splash: {
        paddingTop: 0,   // Splash screen is fully centered, no top offset
    },

    // Component Dimensions
    buttonHeight: 52,        // Primary button height
    socialButtonHeight: 52,  // Social button height
    inputHeight: 52,         // Input field height

    // OTP Input
    otp: {
        boxWidth: 56,    // OTP box width
        boxHeight: 64,   // OTP box height
        gap: 12,         // Gap between OTP boxes
    },

    // Touch Target
    touchTarget: 44,     // Minimum touch target size (accessibility)

    // Icon Sizes
    icon: {
        small: 16,
        medium: 20,
        large: 24,
        xlarge: 60,
    },

    // Logo
    logo: {
        width: 80,
        height: 80,
    },

    // Loading Bar
    loadingBar: {
        width: 60,
        height: 3,
        bottomOffset: 40,
    },
};

export default Spacing;
