// NEXUS Login Screen
// Email/Password inputs, social login, navigation links
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
import { loginUser, clearError } from '../redux/authSlice';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import SocialButton from '../components/SocialButton';
import ErrorMessage from '../components/ErrorMessage';
import Colors from '../constants/Colors';
import Typography from '../constants/Typography';
import Spacing from '../constants/Spacing';

// Simple email validation
const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

const LoginScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const { isLoading, error, isAuthenticated } = useSelector((state) => state.auth);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState(null);
    const [passwordError, setPasswordError] = useState(null);
    const [showError, setShowError] = useState(false);

    // Navigate to Home when authenticated
    useEffect(() => {
        if (isAuthenticated) {
            navigation.replace('Home');
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

    const handleLogin = () => {
        setShowError(false);
        dispatch(clearError());
        
        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();

        if (isEmailValid && isPasswordValid) {
            dispatch(loginUser({ email, password }));
        }
    };

    const handleSocialLogin = (provider) => {
        console.log(`[Social Login] ${provider} login initiated`);
    };

    const isButtonDisabled = !email || !password;

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
                    {/* Heading */}
                    <View style={styles.headingContainer}>
                        <Text style={styles.heading}>Welcome Back</Text>
                        <Text style={styles.subtitle}>Welcome to authentication.</Text>
                    </View>

                    {/* Error Message */}
                    <ErrorMessage
                        message={error || ''}
                        type="error"
                        visible={showError && !!error}
                    />

                    {/* Form */}
                    <View style={styles.form}>
                        <CustomInput
                            label="Email"
                            placeholder="email@gmail.com"
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

                        {/* Forgot Password Link */}
                        <TouchableOpacity
                            style={styles.forgotPassword}
                            onPress={() => navigation.navigate('ResetPassword')}
                        >
                            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                        </TouchableOpacity>

                        {/* Login Button */}
                        <View style={styles.buttonContainer}>
                            <CustomButton
                                title="Log In"
                                onPress={handleLogin}
                                disabled={isButtonDisabled}
                                loading={isLoading}
                            />
                        </View>
                    </View>

                    {/* Divider */}
                    <View style={styles.dividerContainer}>
                        <View style={styles.dividerLine} />
                        <View style={styles.dividerTextContainer}>
                            <Text style={styles.dividerText}>or continue with</Text>
                        </View>
                        <View style={styles.dividerLine} />
                    </View>

                    {/* Social Buttons */}
                    <View style={styles.socialContainer}>
                        <SocialButton
                            type="google"
                            onPress={() => handleSocialLogin('Google')}
                        />
                        <View style={styles.socialSpacing} />
                        <SocialButton
                            type="facebook"
                            onPress={() => handleSocialLogin('Facebook')}
                        />
                    </View>

                    {/* Sign Up Link */}
                    <View style={styles.signupContainer}>
                        <Text style={styles.signupText}>Don't have an account? </Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                            <Text style={styles.signupLink}>Sign Up</Text>
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
        marginBottom: Spacing.xl,
    },
    heading: {
        ...Typography.heading.screen,
    },
    subtitle: {
        ...Typography.subtitle,
        marginTop: Spacing.sm,
    },
    form: {
        marginTop: Spacing.sm,
    },
    inputSpacing: {
        height: Spacing.md,
    },
    forgotPassword: {
        alignSelf: 'flex-end',
        marginTop: 10,
    },
    forgotPasswordText: {
        ...Typography.link,
    },
    buttonContainer: {
        marginTop: Spacing.lg,
    },
    dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: Spacing.lg,
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: Colors.social.divider,
    },
    dividerTextContainer: {
        paddingHorizontal: Spacing.md,
        backgroundColor: Colors.background.primary,
    },
    dividerText: {
        ...Typography.divider,
    },
    socialContainer: {
        flexDirection: 'row',
        marginTop: Spacing.md,
    },
    socialSpacing: {
        width: 12,
    },
    signupContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: Spacing.lg,
        paddingBottom: Spacing.xl,
    },
    signupText: {
        ...Typography.link,
        color: Colors.text.secondary,
    },
    signupLink: {
        ...Typography.linkInline,
    },
});

export default LoginScreen;
