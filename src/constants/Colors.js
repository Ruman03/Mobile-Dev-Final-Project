// NEXUS Design System - Color Tokens
// All colors defined as single source of truth - no hardcoded hex values elsewhere

const Colors = {
    // Background Colors
    background: {
        primary: '#0A0E1A',    // Main screen background (deepest dark navy)
        card: '#141828',       // Input field backgrounds, subtle card surfaces
        elevated: '#1E2340',   // Slightly raised surfaces, hover/press states
    },

    // Accent Colors
    accent: {
        primary: '#4A90D9',    // Primary buttons (Log In, Sign Up, Send Instructions, Verify)
        hover: '#5BA3E8',      // Button press/active state
        glow: 'rgba(74, 144, 217, 0.4)', // Input focus border glow, logo glow on splash
        link: '#4A90D9',       // Tappable text links (Forgot Password?, Login, Sign Up)
    },

    // Text Colors
    text: {
        primary: '#FFFFFF',    // Headings, main body text
        secondary: '#8B92A5',  // Subtitles, labels above inputs
        placeholder: '#5A6078', // Placeholder text inside inputs
        muted: '#6B7280',      // Timers, static non-interactive text
    },

    // Border Colors
    border: {
        default: '#2A3050',    // Input field default border
        focus: '#4A90D9',      // Input field active/focused border
        error: '#E85D5D',      // Input field error state border
    },

    // Error Colors
    error: {
        background: 'rgba(232, 93, 93, 0.15)', // Error message background tint
        text: '#E85D5D',       // Error message text color
    },

    // Success Colors
    success: {
        background: 'rgba(74, 205, 107, 0.15)', // Success message background tint
        text: '#4ACD6B',       // Success message text color
    },

    // Social Colors
    social: {
        google: '#DB4437',     // Google button background
        facebook: '#1877F2',   // Facebook button background
        divider: '#2A3050',    // The horizontal line in "or continue with"
    },
};

export default Colors;
