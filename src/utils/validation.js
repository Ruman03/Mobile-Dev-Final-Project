// Form Validation Utilities for Authentication App

/**
 * Validates email format
 * @param {string} email - Email address to validate
 * @returns {object} - { isValid: boolean, error: string | null }
 */
export const validateEmail = (email) => {
    if (!email || email.trim() === '') {
        return { isValid: false, error: 'Email is required' };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
        return { isValid: false, error: 'Please enter a valid email address' };
    }

    return { isValid: true, error: null };
};

/**
 * Validates password strength and requirements
 * @param {string} password - Password to validate
 * @returns {object} - { isValid: boolean, error: string | null }
 */
export const validatePassword = (password) => {
    if (!password || password === '') {
        return { isValid: false, error: 'Password is required' };
    }

    if (password.length < 8) {
        return { isValid: false, error: 'Password must be at least 8 characters' };
    }

    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);

    if (!hasUpperCase || !hasLowerCase || !hasNumber) {
        return {
            isValid: false,
            error: 'Password must contain uppercase, lowercase, and a number'
        };
    }

    return { isValid: true, error: null };
};

/**
 * Validates confirm password matches password
 * @param {string} password - Original password
 * @param {string} confirmPassword - Confirmation password
 * @returns {object} - { isValid: boolean, error: string | null }
 */
export const validateConfirmPassword = (password, confirmPassword) => {
    if (!confirmPassword || confirmPassword === '') {
        return { isValid: false, error: 'Please confirm your password' };
    }

    if (password !== confirmPassword) {
        return { isValid: false, error: 'Passwords do not match' };
    }

    return { isValid: true, error: null };
};

/**
 * Validates phone number format
 * @param {string} phone - Phone number to validate
 * @returns {object} - { isValid: boolean, error: string | null }
 */
export const validatePhone = (phone) => {
    // Phone is optional, so empty is valid
    if (!phone || phone.trim() === '') {
        return { isValid: true, error: null };
    }

    const phoneRegex = /^[0-9]{10,15}$/;
    if (!phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''))) {
        return { isValid: false, error: 'Please enter a valid phone number (10-15 digits)' };
    }

    return { isValid: true, error: null };
};

/**
 * Validates full name
 * @param {string} name - Full name to validate
 * @returns {object} - { isValid: boolean, error: string | null }
 */
export const validateName = (name) => {
    if (!name || name.trim() === '') {
        return { isValid: false, error: 'Full name is required' };
    }

    if (name.trim().length < 2) {
        return { isValid: false, error: 'Name must be at least 2 characters' };
    }

    return { isValid: true, error: null };
};

/**
 * Validates OTP code
 * @param {string} otp - OTP code to validate
 * @param {number} length - Expected OTP length (default: 6)
 * @returns {object} - { isValid: boolean, error: string | null }
 */
export const validateOTP = (otp, length = 6) => {
    if (!otp || otp === '') {
        return { isValid: false, error: 'OTP is required' };
    }

    const otpRegex = new RegExp(`^[0-9]{${length}}$`);
    if (!otpRegex.test(otp)) {
        return { isValid: false, error: `OTP must be ${length} digits` };
    }

    return { isValid: true, error: null };
};

/**
 * Gets password strength level
 * @param {string} password - Password to check
 * @returns {object} - { level: 'weak' | 'medium' | 'strong', score: number }
 */
export const getPasswordStrength = (password) => {
    if (!password) {
        return { level: 'weak', score: 0 };
    }

    let score = 0;

    // Length checks
    if (password.length >= 8) score += 1;
    if (password.length >= 12) score += 1;

    // Character type checks
    if (/[a-z]/.test(password)) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^a-zA-Z0-9]/.test(password)) score += 1;

    // Determine level based on score
    if (score <= 2) {
        return { level: 'weak', score };
    } else if (score <= 4) {
        return { level: 'medium', score };
    } else {
        return { level: 'strong', score };
    }
};

export default {
    validateEmail,
    validatePassword,
    validateConfirmPassword,
    validatePhone,
    validateName,
    validateOTP,
    getPasswordStrength,
};
