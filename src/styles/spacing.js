// Spacing and Layout Constants for Authentication App
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const spacing = {
    // Base Spacing Units
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    xxl: 24,
    xxxl: 32,

    // Screen Dimensions
    screenWidth: width,
    screenHeight: height,

    // Screen Padding
    screenPaddingHorizontal: 24,
    screenPaddingVertical: 20,

    // Component Spacing
    inputSpacing: 16,
    sectionSpacing: 24,
    buttonSpacing: 16,

    // Component Heights
    inputHeight: 56,
    buttonHeight: 56,
    socialButtonHeight: 50,
    otpInputSize: 52,

    // Border Radius
    borderRadius: {
        xs: 4,
        sm: 8,
        md: 12,
        lg: 16,
        xl: 20,
        full: 9999,
    },

    // Border Width
    borderWidth: {
        thin: 1,
        medium: 1.5,
        thick: 2,
    },

    // Icon Sizes
    iconSize: {
        sm: 16,
        md: 20,
        lg: 24,
        xl: 28,
    },

    // Logo Sizes
    logoSize: {
        splash: 120,
        auth: 80,
    },

    // Safe Area
    safeAreaTop: 50,
    safeAreaBottom: 34,
};

export default spacing;
