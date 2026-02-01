// NEXUS Signup Screen
// Create Account with Name, Email, Password, Confirm Password
// Integrated with Redux Toolkit for state management

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
import { useDispatch, useSelector } from 'react-redux';
import { signupUser, clearError } from '../redux/authSlice';
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

const SignupScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const { isLoading, error, isAuthenticated } = useSelector((state) => state.auth);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    
    const [nameError, setNameError] = useState(null);
    const [emailError, setEmailError] = useState(null);
    const [passwordError, setPasswordError] = useState(null);
    const [confirmError, setConfirmError] = useState(null);
    
    const [showError, setShowError] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    // Navigate to Home when authenticated (auto-login after signup)
    useEffect(() => {
        if (isAuthenticated) {
            setShowSuccess(true);
            setTimeout(() => {
                navigation.replace('Home');
            }, 1000);
        }
    }, [isAuthenticated, navigation]);

    // Show Redux error
    useEffect(() => {
        if (error) {
            setShowError(true);
        }
    }, [error]);

    // Clear error when component unmounts
    useEffect(() => {
        return () => {
            dispatch(clearError());
        };
    }, [dispatch]);

    const validateName = () => {
        if (!name.trim()) {
            setNameError('Name is required');
            return false;
        }
        setNameError(null);
        return true;
    };

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

    const validatePassword = () => {
        if (!password) {
            setPasswordError('Password is required');
            return false;
        }
        if (password.length < 6) {
            setPasswordError('Password must be at least 6 characters');
            return false;
        }
        setPasswordError(null);
        return true;
    };

    const validateConfirmPassword = () => {
        if (!confirmPassword) {
            setConfirmError('Please confirm your password');
            return false;
        }
        if (password !== confirmPassword) {
            setConfirmError('Passwords do not match');
            return false;
        }
        setConfirmError(null);
        return true;
    };

    const handleSignup = () => {
        setShowError(false);
        setShowSuccess(false);
        dispatch(clearError());

        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();
        const isConfirmValid = validateConfirmPassword();

        if (isNameValid && isEmailValid && isPasswordValid && isConfirmValid) {
            dispatch(signupUser({ name, email, password }));
        }
    };

    const isButtonDisabled = !name || !email || !password || !confirmPassword;

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
                        <Text style={styles.heading}>Create Account</Text>
                    </View>

                    {/* Messages */}
                    <ErrorMessage
                        message={error}
                        type="error"
                        visible={showError && !!error}
                    />
                    <ErrorMessage
                        message="Account created successfully!"
                        type="success"
                        visible={showSuccess}
                    />

                    {/* Form */}
                    <View style={styles.form}>
                        <CustomInput
                            label="Name"
                            placeholder="Name"
                            value={name}
                            onChangeText={setName}
                            error={nameError}
                            onBlur={validateName}
                            autoCapitalize="words"
                        />

                        <View style={styles.inputSpacing} />

                        <CustomInput
                            label="Email"
                            placeholder="Email email@gmail.com"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            error={emailError}
                            onBlur={validateEmail}
                        />

                        <View style={styles.inputSpacing} />

                        <CustomInput
                            label="Password"
                            placeholder="Password"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                            showToggle
                            error={passwordError}
                            onBlur={validatePassword}
                        />

                        <View style={styles.inputSpacing} />

                        <CustomInput
                            label="Confirm Password"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            secureTextEntry
                            showToggle
                            error={confirmError}
                            onBlur={validateConfirmPassword}
                        />

                        {/* Sign Up Button */}
                        <View style={styles.buttonContainer}>
                            <CustomButton
                                title="Sign Up"
                                onPress={handleSignup}
                                disabled={isButtonDisabled}
                                loading={isLoading}
                            />
                        </View>
                    </View>

                    {/* Login Link */}
                    <View style={styles.loginContainer}>
                        <Text style={styles.loginText}>Forgot password? </Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                            <Text style={styles.loginLink}>Login</Text>
                        </TouchableOpacity>
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
        marginBottom: 28,
    },
    heading: {
        ...Typography.heading.screen,
    },
    form: {
        marginTop: Spacing.sm,
    },
    inputSpacing: {
        height: Spacing.md,
    },
    buttonContainer: {
        marginTop: 28,
    },
    loginContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
        paddingBottom: Spacing.xl,
    },
    loginText: {
        ...Typography.link,
        color: Colors.text.secondary,
    },
    loginLink: {
        ...Typography.linkInline,
    },
});

export default SignupScreen;
