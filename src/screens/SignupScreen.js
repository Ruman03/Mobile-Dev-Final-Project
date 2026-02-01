// Premium Signup Screen
import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
    TouchableOpacity,
    StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import PasswordStrengthIndicator from '../components/PasswordStrengthIndicator';
import SuccessMessage from '../components/SuccessMessage';
import BackIcon from '../components/BackIcon';
import colors from '../styles/colors';
import spacing from '../styles/spacing';
import {
    validateEmail,
    validatePassword,
    validateConfirmPassword,
    validateName,
    validatePhone,
} from '../utils/validation';

const SignupScreen = ({ navigation }) => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [acceptTerms, setAcceptTerms] = useState(false);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const emailRef = useRef(null);
    const phoneRef = useRef(null);
    const passwordRef = useRef(null);
    const confirmPasswordRef = useRef(null);

    const validateForm = () => {
        const newErrors = {};

        const nameValidation = validateName(fullName);
        if (!nameValidation.isValid) newErrors.fullName = nameValidation.error;

        const emailValidation = validateEmail(email);
        if (!emailValidation.isValid) newErrors.email = emailValidation.error;

        const phoneValidation = validatePhone(phone);
        if (!phoneValidation.isValid) newErrors.phone = phoneValidation.error;

        const passwordValidation = validatePassword(password);
        if (!passwordValidation.isValid) newErrors.password = passwordValidation.error;

        const confirmPasswordValidation = validateConfirmPassword(password, confirmPassword);
        if (!confirmPasswordValidation.isValid) newErrors.confirmPassword = confirmPasswordValidation.error;

        if (!acceptTerms) newErrors.terms = 'Please accept the Terms & Conditions';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const isFormValid = () => {
        return (
            fullName.trim() !== '' &&
            email.trim() !== '' &&
            password.length >= 8 &&
            confirmPassword === password &&
            acceptTerms
        );
    };

    const handleSignup = async () => {
        if (!validateForm()) return;

        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setShowSuccess(true);
            setTimeout(() => navigation.navigate('Login'), 2000);
        }, 1500);
    };

    const clearError = (field) => {
        if (errors[field]) setErrors({ ...errors, [field]: null });
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

            <SuccessMessage
                message="Account created successfully!"
                visible={showSuccess}
                onHide={() => setShowSuccess(false)}
            />

            {/* Gradient Header */}
            <LinearGradient
                colors={colors.gradientPrimary}
                style={styles.header}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
                <View style={styles.headerDecor1} />
                <View style={styles.headerDecor2} />

                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <BackIcon />
                </TouchableOpacity>

                <Text style={styles.title}>Create Account</Text>
                <Text style={styles.subtitle}>Sign up to get started</Text>
            </LinearGradient>

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardAvoid}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <ScrollView
                        contentContainerStyle={styles.scrollContent}
                        showsVerticalScrollIndicator={false}
                        keyboardShouldPersistTaps="handled"
                    >
                        {/* Form Card */}
                        <View style={styles.formCard}>
                            <CustomInput
                                placeholder="Full Name"
                                value={fullName}
                                onChangeText={(text) => { setFullName(text); clearError('fullName'); }}
                                icon="user"
                                error={errors.fullName}
                                autoCapitalize="words"
                                returnKeyType="next"
                                onSubmitEditing={() => emailRef.current?.focus()}
                            />

                            <CustomInput
                                placeholder="Email Address"
                                value={email}
                                onChangeText={(text) => { setEmail(text); clearError('email'); }}
                                keyboardType="email-address"
                                icon="mail"
                                error={errors.email}
                                inputRef={emailRef}
                                returnKeyType="next"
                                onSubmitEditing={() => phoneRef.current?.focus()}
                            />

                            <CustomInput
                                placeholder="Phone Number (Optional)"
                                value={phone}
                                onChangeText={(text) => { setPhone(text); clearError('phone'); }}
                                keyboardType="phone-pad"
                                icon="phone"
                                error={errors.phone}
                                inputRef={phoneRef}
                                returnKeyType="next"
                                onSubmitEditing={() => passwordRef.current?.focus()}
                            />

                            <CustomInput
                                placeholder="Password"
                                value={password}
                                onChangeText={(text) => { setPassword(text); clearError('password'); }}
                                secureTextEntry
                                icon="lock"
                                error={errors.password}
                                inputRef={passwordRef}
                                returnKeyType="next"
                                onSubmitEditing={() => confirmPasswordRef.current?.focus()}
                            />

                            <PasswordStrengthIndicator password={password} />

                            <CustomInput
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChangeText={(text) => { setConfirmPassword(text); clearError('confirmPassword'); }}
                                secureTextEntry
                                icon="lock"
                                error={errors.confirmPassword}
                                inputRef={confirmPasswordRef}
                                returnKeyType="done"
                                onSubmitEditing={handleSignup}
                            />

                            {/* Terms Checkbox */}
                            <TouchableOpacity
                                style={styles.termsContainer}
                                onPress={() => { setAcceptTerms(!acceptTerms); clearError('terms'); }}
                                activeOpacity={0.7}
                            >
                                <View style={[styles.checkbox, acceptTerms && styles.checkboxChecked, errors.terms && styles.checkboxError]}>
                                    {acceptTerms && (
                                        <View style={styles.checkIcon}>
                                            <View style={styles.checkLine1} />
                                            <View style={styles.checkLine2} />
                                        </View>
                                    )}
                                </View>
                                <Text style={styles.termsText}>
                                    I agree to the <Text style={styles.termsLink}>Terms & Conditions</Text>
                                </Text>
                            </TouchableOpacity>
                            {errors.terms && <Text style={styles.errorText}>{errors.terms}</Text>}

                            <CustomButton
                                title="Create Account"
                                onPress={handleSignup}
                                loading={loading}
                                disabled={!isFormValid()}
                                style={styles.signupButton}
                            />
                        </View>

                        {/* Login Link */}
                        <View style={styles.loginContainer}>
                            <Text style={styles.loginText}>Already have an account? </Text>
                            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                                <Text style={styles.loginLink}>Sign In</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.backgroundSecondary,
    },
    header: {
        paddingTop: 50,
        paddingBottom: 40,
        paddingHorizontal: spacing.screenPaddingHorizontal,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        overflow: 'hidden',
    },
    headerDecor1: {
        position: 'absolute',
        top: -30,
        right: -30,
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
    headerDecor2: {
        position: 'absolute',
        bottom: -20,
        left: -40,
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: spacing.lg,
    },

    title: {
        fontSize: 28,
        fontWeight: '700',
        color: colors.textWhite,
        marginBottom: spacing.xs,
    },
    subtitle: {
        fontSize: 16,
        color: 'rgba(255, 255, 255, 0.8)',
    },
    keyboardAvoid: {
        flex: 1,
        marginTop: -20,
    },
    scrollContent: {
        flexGrow: 1,
        paddingHorizontal: spacing.screenPaddingHorizontal,
        paddingBottom: spacing.xxl,
    },
    formCard: {
        backgroundColor: colors.background,
        borderRadius: spacing.borderRadius.xl,
        padding: spacing.xl,
        shadowColor: colors.shadowDark,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 8,
    },
    termsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: spacing.lg,
        marginTop: spacing.sm,
    },
    checkbox: {
        width: 24,
        height: 24,
        borderRadius: 6,
        borderWidth: 2,
        borderColor: colors.border,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: spacing.sm,
    },
    checkboxChecked: {
        backgroundColor: colors.primary,
        borderColor: colors.primary,
    },
    checkboxError: {
        borderColor: colors.error,
    },
    checkIcon: {
        width: 10,
        height: 8,
    },
    checkLine1: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: 5,
        height: 2,
        backgroundColor: colors.textWhite,
        borderRadius: 1,
        transform: [{ rotate: '45deg' }],
    },
    checkLine2: {
        position: 'absolute',
        bottom: 2,
        left: 3,
        width: 8,
        height: 2,
        backgroundColor: colors.textWhite,
        borderRadius: 1,
        transform: [{ rotate: '-45deg' }],
    },
    termsText: {
        fontSize: 14,
        color: colors.textSecondary,
        flex: 1,
    },
    termsLink: {
        color: colors.primary,
        fontWeight: '600',
    },
    errorText: {
        fontSize: 12,
        color: colors.error,
        marginTop: -spacing.sm,
        marginBottom: spacing.md,
        marginLeft: spacing.xs,
    },
    signupButton: {
        marginTop: spacing.sm,
    },
    loginContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: spacing.xl,
    },
    loginText: {
        fontSize: 15,
        color: colors.textSecondary,
    },
    loginLink: {
        fontSize: 15,
        color: colors.primary,
        fontWeight: '700',
    },
});

export default SignupScreen;
