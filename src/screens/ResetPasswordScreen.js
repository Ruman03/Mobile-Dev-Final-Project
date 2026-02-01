// NEXUS Reset Password Screen
// Email input to request password reset

import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import BackButton from '../components/BackButton';
import ErrorMessage from '../components/ErrorMessage';
import Colors from '../constants/Colors';
import Typography from '../constants/Typography';
import Spacing from '../constants/Spacing';

// Simple email validation
const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

const ResetPasswordScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [showError, setShowError] = useState(false);
    const [loading, setLoading] = useState(false);

    const validateEmail = () => {
        if (!email) {
            setEmailError('Email is required');
            return false;
        }
        if (!isValidEmail(email)) {
            setEmailError('Please enter a valid email address');
            return false;
        }
        setEmailError(null);
        return true;
    };

    const handleSendInstructions = () => {
        setShowError(false);
        const isEmailValid = validateEmail();

        if (isEmailValid) {
            setLoading(true);
            // Simulate API call delay
            setTimeout(() => {
                setLoading(false);
                navigation.navigate('OTP', { email });
            }, 1500);
        } else {
            setErrorMessage('Please enter a valid email address');
            setShowError(true);
        }
    };

    const isButtonDisabled = !email;

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
                        <Text style={styles.heading}>Reset Password</Text>
                        <Text style={styles.subtitle}>
                            Enter your email address to reset your password.
                        </Text>
                    </View>

                    {/* Error Message */}
                    <ErrorMessage
                        message={errorMessage}
                        type="error"
                        visible={showError}
                    />

                    {/* Form */}
                    <View style={styles.form}>
                        <CustomInput
                            label="Email"
                            placeholder="Email"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            error={emailError}
                            onBlur={validateEmail}
                        />

                        {/* Send Instructions Button */}
                        <View style={styles.buttonContainer}>
                            <CustomButton
                                title="Send Instructions"
                                onPress={handleSendInstructions}
                                disabled={isButtonDisabled}
                                loading={loading}
                            />
                        </View>
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
        marginBottom: Spacing.xl,
    },
    heading: {
        ...Typography.heading.screen,
    },
    subtitle: {
        ...Typography.subtitle,
        marginTop: 10,
        textAlign: 'center',
    },
    form: {
        marginTop: Spacing.sm,
    },
    buttonContainer: {
        marginTop: 28,
    },
});

export default ResetPasswordScreen;
