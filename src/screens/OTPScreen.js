// Premium OTP Verification Screen
import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    StatusBar,
    Animated,
    Keyboard,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import CustomButton from '../components/CustomButton';
import SuccessMessage from '../components/SuccessMessage';
import BackIcon from '../components/BackIcon';
import colors from '../styles/colors';
import spacing from '../styles/spacing';

const OTP_LENGTH = 6;
const RESEND_TIMER = 60;

const OTPScreen = ({ navigation, route }) => {
    const { email } = route.params || { email: 'user@email.com' };

    const [otp, setOtp] = useState(new Array(OTP_LENGTH).fill(''));
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showSuccess, setShowSuccess] = useState(false);
    const [timer, setTimer] = useState(RESEND_TIMER);
    const [canResend, setCanResend] = useState(false);

    const inputRefs = useRef([]);
    const shakeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        let interval;
        if (timer > 0 && !canResend) {
            interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
        } else if (timer === 0) {
            setCanResend(true);
        }
        return () => clearInterval(interval);
    }, [timer, canResend]);

    useEffect(() => {
        setTimeout(() => inputRefs.current[0]?.focus(), 500);
    }, []);

    const getMaskedEmail = () => {
        if (!email) return '';
        const [localPart, domain] = email.split('@');
        if (!domain) return email;
        return `${localPart.charAt(0)}***@${domain}`;
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const handleOtpChange = (value, index) => {
        if (value && !/^[0-9]$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
        setError(null);

        if (value && index < OTP_LENGTH - 1) {
            inputRefs.current[index + 1]?.focus();
        }

        if (value && index === OTP_LENGTH - 1) {
            const fullOtp = newOtp.join('');
            if (fullOtp.length === OTP_LENGTH) {
                Keyboard.dismiss();
                handleVerify(fullOtp);
            }
        }
    };

    const handleKeyPress = (e, index) => {
        if (e.nativeEvent.key === 'Backspace') {
            if (otp[index] === '' && index > 0) {
                inputRefs.current[index - 1]?.focus();
                const newOtp = [...otp];
                newOtp[index - 1] = '';
                setOtp(newOtp);
            }
        }
    };

    const shakeAnimation = () => {
        Animated.sequence([
            Animated.timing(shakeAnim, { toValue: 10, duration: 50, useNativeDriver: true }),
            Animated.timing(shakeAnim, { toValue: -10, duration: 50, useNativeDriver: true }),
            Animated.timing(shakeAnim, { toValue: 10, duration: 50, useNativeDriver: true }),
            Animated.timing(shakeAnim, { toValue: 0, duration: 50, useNativeDriver: true }),
        ]).start();
    };

    const handleVerify = async (code = otp.join('')) => {
        if (code.length !== OTP_LENGTH) {
            setError('Please enter all digits');
            shakeAnimation();
            return;
        }

        setLoading(true);
        setError(null);

        setTimeout(() => {
            setLoading(false);
            if (code === '123456') {
                setShowSuccess(true);
                setTimeout(() => navigation.navigate('Login'), 2000);
            } else {
                setError('Invalid OTP. Please try again.');
                shakeAnimation();
            }
        }, 1500);
    };

    const handleResend = () => {
        if (!canResend) return;
        setTimer(RESEND_TIMER);
        setCanResend(false);
        setOtp(new Array(OTP_LENGTH).fill(''));
        setError(null);
        inputRefs.current[0]?.focus();
    };

    const isOtpComplete = otp.every((digit) => digit !== '');

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

            <SuccessMessage
                message="Password reset successful!"
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
                    <View style={styles.mailIcon}>
                        <View style={styles.mailBody} />
                        <View style={styles.mailFlap} />
                    </View>
                </View>

                <Text style={styles.title}>Verify Your Email</Text>
                <Text style={styles.subtitle}>Enter the 6-digit code sent to</Text>
                <Text style={styles.emailText}>{getMaskedEmail()}</Text>
            </LinearGradient>

            <View style={styles.content}>
                {/* OTP Card */}
                <View style={styles.formCard}>
                    {/* OTP Input */}
                    <Animated.View style={[styles.otpContainer, { transform: [{ translateX: shakeAnim }] }]}>
                        {otp.map((digit, index) => (
                            <TextInput
                                key={index}
                                ref={(ref) => (inputRefs.current[index] = ref)}
                                style={[
                                    styles.otpInput,
                                    digit && styles.otpInputFilled,
                                    error && styles.otpInputError,
                                ]}
                                value={digit}
                                onChangeText={(value) => handleOtpChange(value, index)}
                                onKeyPress={(e) => handleKeyPress(e, index)}
                                keyboardType="number-pad"
                                maxLength={1}
                                selectTextOnFocus
                                caretHidden
                            />
                        ))}
                    </Animated.View>

                    {/* Error Message */}
                    {error && (
                        <View style={styles.errorContainer}>
                            <View style={styles.errorIcon}>
                                <Text style={styles.errorIconText}>!</Text>
                            </View>
                            <Text style={styles.errorText}>{error}</Text>
                        </View>
                    )}

                    {/* Timer and Resend */}
                    <View style={styles.resendContainer}>
                        {!canResend ? (
                            <Text style={styles.timerText}>
                                Resend code in <Text style={styles.timerValue}>{formatTime(timer)}</Text>
                            </Text>
                        ) : (
                            <TouchableOpacity onPress={handleResend}>
                                <Text style={styles.resendText}>Resend OTP</Text>
                            </TouchableOpacity>
                        )}
                    </View>

                    {/* Verify Button */}
                    <CustomButton
                        title="Verify & Continue"
                        onPress={() => handleVerify()}
                        loading={loading}
                        disabled={!isOtpComplete}
                    />
                </View>

                {/* Back to Login */}
                <TouchableOpacity
                    style={styles.backToLogin}
                    onPress={() => navigation.navigate('Login')}
                >
                    <BackIcon color={colors.primary} size={10} thickness={2} />
                    <Text style={styles.backToLoginText}>Back to Sign In</Text>
                </TouchableOpacity>
            </View>
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
    mailIcon: {
        width: 36,
        height: 28,
        position: 'relative',
    },
    mailBody: {
        width: 36,
        height: 24,
        borderWidth: 3,
        borderColor: colors.textWhite,
        borderRadius: 4,
        marginTop: 4,
    },
    mailFlap: {
        position: 'absolute',
        top: 0,
        left: 4,
        width: 0,
        height: 0,
        borderLeftWidth: 14,
        borderRightWidth: 14,
        borderTopWidth: 14,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderTopColor: colors.textWhite,
        transform: [{ rotate: '180deg' }],
    },
    title: {
        fontSize: 26,
        fontWeight: '700',
        color: colors.textWhite,
        marginBottom: spacing.xs,
    },
    subtitle: {
        fontSize: 14,
        color: 'rgba(255, 255, 255, 0.8)',
    },
    emailText: {
        fontSize: 15,
        fontWeight: '600',
        color: colors.textWhite,
        marginTop: spacing.xs,
    },
    content: {
        flex: 1,
        paddingHorizontal: spacing.screenPaddingHorizontal,
        marginTop: -20,
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
    otpContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: spacing.lg,
    },
    otpInput: {
        width: 48,
        height: 56,
        borderRadius: spacing.borderRadius.md,
        borderWidth: 2,
        borderColor: colors.border,
        backgroundColor: colors.backgroundSecondary,
        textAlign: 'center',
        fontSize: 24,
        fontWeight: '700',
        color: colors.textPrimary,
    },
    otpInputFilled: {
        borderColor: colors.primary,
        backgroundColor: colors.background,
    },
    otpInputError: {
        borderColor: colors.error,
    },
    errorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: spacing.lg,
        gap: spacing.xs,
    },
    errorIcon: {
        width: 16,
        height: 16,
        borderRadius: 8,
        backgroundColor: colors.error,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorIconText: {
        color: colors.textWhite,
        fontSize: 10,
        fontWeight: '700',
    },
    errorText: {
        fontSize: 13,
        color: colors.error,
        fontWeight: '500',
    },
    resendContainer: {
        alignItems: 'center',
        marginBottom: spacing.xl,
    },
    timerText: {
        fontSize: 14,
        color: colors.textSecondary,
    },
    timerValue: {
        color: colors.primary,
        fontWeight: '700',
    },
    resendText: {
        fontSize: 15,
        color: colors.primary,
        fontWeight: '700',
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

export default OTPScreen;
