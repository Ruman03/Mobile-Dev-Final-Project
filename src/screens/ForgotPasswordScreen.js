// Premium Forgot Password Screen
import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
    TouchableOpacity,
    StatusBar,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import SuccessMessage from '../components/SuccessMessage';
import BackIcon from '../components/BackIcon';
import colors from '../styles/colors';
import spacing from '../styles/spacing';
import { validateEmail } from '../utils/validation';

const ForgotPasswordScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const handleSendResetLink = async () => {
        const emailValidation = validateEmail(email);
        if (!emailValidation.isValid) {
            setError(emailValidation.error);
            return;
        }

        setLoading(true);
        setError(null);

        setTimeout(() => {
            setLoading(false);
            setShowSuccess(true);
            setTimeout(() => navigation.navigate('OTP', { email }), 1500);
        }, 1500);
    };

    const getMaskedEmail = () => {
        if (!email) return '';
        const [localPart, domain] = email.split('@');
        if (!domain) return email;
        const maskedLocal = localPart.charAt(0) + '***';
        return `${maskedLocal}@${domain}`;
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

            <SuccessMessage
                message={`Reset link sent to ${getMaskedEmail()}`}
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

                <View style={styles.iconContainer}>
                    <View style={styles.keyIcon}>
                        <View style={styles.keyCircle} />
                        <View style={styles.keyBar} />
                        <View style={styles.keyTeeth1} />
                        <View style={styles.keyTeeth2} />
                    </View>
                </View>

                <Text style={styles.title}>Forgot Password?</Text>
                <Text style={styles.subtitle}>No worries, we'll help you reset it</Text>
            </LinearGradient>

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardAvoid}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.content}>
                        {/* Form Card */}
                        <View style={styles.formCard}>
                            <Text style={styles.instruction}>
                                Enter your email address and we'll send you a link to reset your password.
                            </Text>

                            <CustomInput
                                placeholder="Email Address"
                                value={email}
                                onChangeText={(text) => { setEmail(text); if (error) setError(null); }}
                                keyboardType="email-address"
                                icon="mail"
                                error={error}
                                returnKeyType="done"
                                onSubmitEditing={handleSendResetLink}
                            />

                            <CustomButton
                                title="Send Reset Link"
                                onPress={handleSendResetLink}
                                loading={loading}
                                disabled={email.trim() === ''}
                                style={styles.submitButton}
                            />
                        </View>

                        <TouchableOpacity
                            style={styles.backToLogin}
                            onPress={() => navigation.navigate('Login')}
                        >
                            <BackIcon color={colors.primary} size={10} thickness={2} />
                            <Text style={styles.backToLoginText}>Back to Sign In</Text>
                        </TouchableOpacity>
                    </View>
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
        paddingBottom: 50,
        paddingHorizontal: spacing.screenPaddingHorizontal,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        alignItems: 'center',
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
        position: 'absolute',
        top: 50,
        left: spacing.screenPaddingHorizontal,
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
    },

    iconContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: spacing.lg,
        marginTop: spacing.lg,
    },
    keyIcon: {
        width: 36,
        height: 20,
        position: 'relative',
    },
    keyCircle: {
        position: 'absolute',
        left: 0,
        top: 2,
        width: 16,
        height: 16,
        borderRadius: 8,
        borderWidth: 3,
        borderColor: colors.textWhite,
    },
    keyBar: {
        position: 'absolute',
        left: 14,
        top: 8,
        width: 22,
        height: 4,
        backgroundColor: colors.textWhite,
        borderRadius: 2,
    },
    keyTeeth1: {
        position: 'absolute',
        right: 4,
        top: 12,
        width: 4,
        height: 6,
        backgroundColor: colors.textWhite,
    },
    keyTeeth2: {
        position: 'absolute',
        right: 12,
        top: 12,
        width: 4,
        height: 6,
        backgroundColor: colors.textWhite,
    },
    title: {
        fontSize: 26,
        fontWeight: '700',
        color: colors.textWhite,
        marginBottom: spacing.xs,
    },
    subtitle: {
        fontSize: 15,
        color: 'rgba(255, 255, 255, 0.8)',
    },
    keyboardAvoid: {
        flex: 1,
        marginTop: -20,
    },
    content: {
        flex: 1,
        paddingHorizontal: spacing.screenPaddingHorizontal,
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
    instruction: {
        fontSize: 15,
        color: colors.textSecondary,
        lineHeight: 22,
        marginBottom: spacing.xl,
    },
    submitButton: {
        marginTop: spacing.md,
    },
    backToLogin: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 'auto',
        paddingVertical: spacing.xxl,
        gap: spacing.sm,
    },
    backToLoginText: {
        fontSize: 15,
        color: colors.primary,
        fontWeight: '600',
    },
});

export default ForgotPasswordScreen;
