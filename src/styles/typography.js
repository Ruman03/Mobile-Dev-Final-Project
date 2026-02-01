// Typography Styles for Authentication App
import { Platform } from 'react-native';

const fontFamily = Platform.select({
    ios: 'System',
    android: 'Roboto',
});

export const typography = {
    // Font Families
    fontFamily: {
        regular: fontFamily,
        medium: fontFamily,
        semiBold: fontFamily,
        bold: fontFamily,
    },

    // Font Sizes
    fontSize: {
        xs: 12,
        sm: 14,
        md: 16,
        lg: 18,
        xl: 20,
        xxl: 24,
        xxxl: 28,
        display: 32,
    },

    // Font Weights
    fontWeight: {
        regular: '400',
        medium: '500',
        semiBold: '600',
        bold: '700',
    },

    // Line Heights
    lineHeight: {
        tight: 1.2,
        normal: 1.5,
        relaxed: 1.75,
    },

    // Predefined Text Styles
    heading1: {
        fontSize: 28,
        fontWeight: '700',
        lineHeight: 34,
    },
    heading2: {
        fontSize: 24,
        fontWeight: '700',
        lineHeight: 30,
    },
    heading3: {
        fontSize: 20,
        fontWeight: '600',
        lineHeight: 26,
    },
    body: {
        fontSize: 16,
        fontWeight: '400',
        lineHeight: 24,
    },
    bodySmall: {
        fontSize: 14,
        fontWeight: '400',
        lineHeight: 20,
    },
    caption: {
        fontSize: 12,
        fontWeight: '400',
        lineHeight: 16,
    },
    button: {
        fontSize: 16,
        fontWeight: '600',
        lineHeight: 24,
    },
    input: {
        fontSize: 16,
        fontWeight: '400',
        lineHeight: 24,
    },
    error: {
        fontSize: 12,
        fontWeight: '400',
        lineHeight: 16,
    },
    link: {
        fontSize: 14,
        fontWeight: '500',
        lineHeight: 20,
    },
};

export default typography;
