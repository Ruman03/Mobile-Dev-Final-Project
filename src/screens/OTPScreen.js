// NEXUS OTP Screen
// 4-digit OTP verification with countdown timer

import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import OTPInput from '../components/OTPInput';
import CustomButton from '../components/CustomButton';
import BackButton from '../components/BackButton';
import ErrorMessage from '../components/ErrorMessage';
import Colors from '../constants/Colors';
import Typography from '../constants/Typography';
import Spacing from '../constants/Spacing';

const TIMER_DURATION = 60;

const OTPScreen = ({ navigation, route }) => {
    const { email } = route.params || { email: 'user@email.com' };
    
    const [otp, setOtp] = useState('');
    const [otpError, setOtpError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [showError, setShowError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [timer, setTimer] = useState(TIMER_DURATION);
    const [canResend, setCanResend] = useState(false);

    // Countdown timer
    useEffect(() => {
        let interval;
        if (timer > 0 && !canResend) {
            interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
        } else if (timer === 0) {
            setCanResend(true);
        }
        return () => clearInterval(interval);
    }, [timer, canResend]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const handleVerify = () => {
        setShowError(false);
        setOtpError(false);

        if (otp.length !== 4) {
            setOtpError(true);
            setErrorMessage('Please enter all 4 digits');
            setShowError(true);
            return;
        }

        setLoading(true);
        // Simulate verification
        setTimeout(() => {
            setLoading(false);
            // For demo, accept any 4 digit code
            navigation.reset({
                index: 0,
                routes: [{ name: 'Home' }],
            });
        }, 1500);
    };

    const handleResend = () => {
        console.log('[OTP] Resend code requested');
        setTimer(TIMER_DURATION);
        setCanResend(false);
        setOtp('');
        setOtpError(false);
        setShowError(false);
    };

    const isButtonDisabled = otp.length !== 4;

    return (
        <View style={styles.container}>
            <StatusBar
                barStyle="light-content"
                backgroundColor={Colors.background.primary}
            />
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardView}
            >
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                >
                    {/* Back Button */}
                    <BackButton onPress={() => navigation.goBack()} />

                    {/* Heading */}
                    <View style={styles.headingContainer}>
                        <Text style={styles.heading}>Verify</Text>
                        <Text style={styles.heading}>Verification Code</Text>
                    </View>

                    {/* Phone Icon */}
                    <View style={styles.iconContainer}>
                        <Icon
                            name="phone-portrait-outline"
                            size={Spacing.icon.xlarge}
                            color={Colors.accent.primary}
                        />
                    </View>

                    {/* Instruction Text */}
                    <Text style={styles.instruction}>
                        Enter the code sent to your email.
                    </Text>

                    {/* Error Message */}
                    <ErrorMessage
                        message={errorMessage}
                        type="error"
                        visible={showError}
                    />

                    {/* OTP Input */}
                    <View style={styles.otpContainer}>
                        <OTPInput
                            value={otp}
                            onChangeText={setOtp}
                            error={otpError}
                        />
                    </View>

                    {/* Timer / Resend */}
                    <View style={styles.timerContainer}>
                        {canResend ? (
                            <TouchableOpacity onPress={handleResend}>
                                <Text style={styles.resendLink}>Resend Code</Text>
                            </TouchableOpacity>
                        ) : (
                            <Text style={styles.timerText}>
                                Timer: {formatTime(timer)}
                            </Text>
                        )}
                    </View>

                    {/* Verify Button */}
                    <View style={styles.buttonContainer}>
                        <CustomButton
                            title="Verify"
                            onPress={handleVerify}
                            disabled={isButtonDisabled}
                            loading={loading}
                        />
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background.primary,
    },
    keyboardView: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        paddingHorizontal: Spacing.screen.paddingH,
        paddingTop: Spacing.screen.paddingTop,
    },
    headingContainer: {
        alignItems: 'center',
        marginTop: Spacing.lg,
    },
    heading: {
        ...Typography.heading.otp,
        textAlign: 'center',
    },
    iconContainer: {
        alignItems: 'center',
        marginTop: 20,
    },
    instruction: {
        ...Typography.subtitle,
        textAlign: 'center',
        marginTop: Spacing.md,
    },
    otpContainer: {
        marginTop: Spacing.lg,
        alignItems: 'center',
    },
    timerContainer: {
        alignItems: 'center',
        marginTop: 12,
    },
    timerText: {
        ...Typography.timer,
    },
    resendLink: {
        ...Typography.link,
    },
    buttonContainer: {
        marginTop: 28,
    },
});

export default OTPScreen;
