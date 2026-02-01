// NEXUS Design System - Typography Tokens
// Uses Inter font family with system fallback

import Colors from './Colors';

const fontFamily = 'Inter';

const Typography = {
    // Headings
    heading: {
        splash: {
            fontFamily,
            fontSize: 28,
            fontWeight: '700',
            lineHeight: 34,
            color: Colors.text.primary,
            letterSpacing: 4,
        },
        screen: {
            fontFamily,
            fontSize: 30,
            fontWeight: '700',
            lineHeight: 36,
            color: Colors.text.primary,
        },
        otp: {
            fontFamily,
            fontSize: 26,
            fontWeight: '700',
            lineHeight: 32,
            color: Colors.text.primary,
        },
    },

    // Subtitle
    subtitle: {
        fontFamily,
        fontSize: 14,
        fontWeight: '400',
        lineHeight: 20,
        color: Colors.text.secondary,
    },

    // Input Label
    label: {
        fontFamily,
        fontSize: 13,
        fontWeight: '500',
        lineHeight: 18,
        color: Colors.text.secondary,
    },

    // Input Text
    input: {
        fontFamily,
        fontSize: 15,
        fontWeight: '400',
        lineHeight: 22,
        color: Colors.text.primary,
    },

    // Placeholder
    placeholder: {
        fontFamily,
        fontSize: 15,
        fontWeight: '400',
        lineHeight: 22,
        color: Colors.text.placeholder,
    },

    // Button Text
    button: {
        fontFamily,
        fontSize: 16,
        fontWeight: '600',
        lineHeight: 24,
        color: Colors.text.primary,
    },

    // Link Text
    link: {
        fontFamily,
        fontSize: 13,
        fontWeight: '500',
        lineHeight: 18,
        color: Colors.accent.link,
    },

    // Inline Link (colored portion)
    linkInline: {
        fontFamily,
        fontSize: 13,
        fontWeight: '600',
        lineHeight: 18,
        color: Colors.accent.link,
    },

    // Timer Text
    timer: {
        fontFamily,
        fontSize: 13,
        fontWeight: '400',
        lineHeight: 18,
        color: Colors.text.muted,
    },

    // OTP Digit
    otpDigit: {
        fontFamily,
        fontSize: 24,
        fontWeight: '700',
        lineHeight: 30,
        color: Colors.text.primary,
    },

    // Error Message
    error: {
        fontFamily,
        fontSize: 12,
        fontWeight: '400',
        lineHeight: 16,
        color: Colors.error.text,
    },

    // Message Banner Text
    message: {
        fontFamily,
        fontSize: 13,
        fontWeight: '500',
        lineHeight: 18,
    },

    // Divider Text
    divider: {
        fontFamily,
        fontSize: 12,
        fontWeight: '400',
        lineHeight: 16,
        color: Colors.text.muted,
    },

    // Social Button Text
    socialButton: {
        fontFamily,
        fontSize: 15,
        fontWeight: '600',
        lineHeight: 22,
        color: Colors.text.primary,
    },
};

export default Typography;
