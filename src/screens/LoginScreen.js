// Premium Login Screen with Gradient Header
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
    Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import SocialButton from '../components/SocialButton';
import SuccessMessage from '../components/SuccessMessage';
import colors from '../styles/colors';
import spacing from '../styles/spacing';
import { validateEmail, validatePassword } from '../utils/validation';

const { width } = Dimensions.get('window');

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const passwordRef = useRef(null);

    const validateForm = () => {
        const newErrors = {};

        const emailValidation = validateEmail(email);
        if (!emailValidation.isValid) {
            newErrors.email = emailValidation.error;
        }

        const passwordValidation = validatePassword(password);
        if (!passwordValidation.isValid) {
            newErrors.password = passwordValidation.error;
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const isFormValid = () => {
        return email.trim() !== '' && password.length >= 8;
    };

    const handleLogin = async () => {
        if (!validateForm()) return;

        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setShowSuccess(true);
        }, 1500);
    };

    const handleSocialLogin = (provider) => {
        console.log(`Login with ${provider}`);
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

            <SuccessMessage
                message="Login successful! Welcome back!"
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
                <View style={styles.headerDecor3} />

                <View style={styles.logoContainer}>
                    <View style={styles.logoCircle}>
                        <View style={styles.shieldIcon}>
                            <View style={styles.shieldTop} />
                            <View style={styles.shieldBottom} />
                        </View>
                    </View>
                </View>
                <Text style={styles.title}>Welcome Back</Text>
                <Text style={styles.subtitle}>Sign in to continue</Text>
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
                                placeholder="Email Address"
                                value={email}
                                onChangeText={(text) => {
                                    setEmail(text);
                                    if (errors.email) setErrors({ ...errors, email: null });
                                }}
                                keyboardType="email-address"
                                icon="mail"
                                error={errors.email}
                                returnKeyType="next"
                                onSubmitEditing={() => passwordRef.current?.focus()}
                            />

                            <CustomInput
                                placeholder="Password"
                                value={password}
                                onChangeText={(text) => {
                                    setPassword(text);
                                    if (errors.password) setErrors({ ...errors, password: null });
                                }}
                                secureTextEntry
                                icon="lock"
                                error={errors.password}
                                inputRef={passwordRef}
                                returnKeyType="done"
                                onSubmitEditing={handleLogin}
                            />

                            <TouchableOpacity
                                style={styles.forgotPassword}
                                onPress={() => navigation.navigate('ForgotPassword')}
                            >
                                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                            </TouchableOpacity>

                            <CustomButton
                                title="Sign In"
                                onPress={handleLogin}
                                loading={loading}
                                disabled={!isFormValid()}
                                style={styles.loginButton}
                            />

                            {/* Divider */}
                            <View style={styles.divider}>
                                <View style={styles.dividerLine} />
                                <View style={styles.dividerTextContainer}>
                                    <Text style={styles.dividerText}>or continue with</Text>
                                </View>
                                <View style={styles.dividerLine} />
                            </View>

                            {/* Social Login */}
                            <View style={styles.socialContainer}>
                                <SocialButton
                                    provider="google"
                                    onPress={() => handleSocialLogin('google')}
                                    style={styles.socialButton}
                                />
                                <SocialButton
                                    provider="facebook"
                                    onPress={() => handleSocialLogin('facebook')}
                                    style={styles.socialButton}
                                />
                            </View>
                        </View>

                        {/* Sign Up Link */}
                        <View style={styles.signupContainer}>
                            <Text style={styles.signupText}>Don't have an account? </Text>
                            <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                                <Text style={styles.signupLink}>Sign Up</Text>
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
        paddingTop: 60,
        paddingBottom: 50,
        paddingHorizontal: spacing.screenPaddingHorizontal,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        alignItems: 'center',
        overflow: 'hidden',
    },
    headerDecor1: {
        position: 'absolute',
        top: -50,
        right: -50,
        width: 150,
        height: 150,
        borderRadius: 75,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
    headerDecor2: {
        position: 'absolute',
        bottom: -30,
        left: -30,
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
    },
    headerDecor3: {
        position: 'absolute',
        top: 50,
        left: 50,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
    },
    logoContainer: {
        marginBottom: spacing.lg,
    },
    logoCircle: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: 'rgba(255, 255, 255, 0.3)',
    },
    shieldIcon: {
        width: 36,
        height: 44,
        alignItems: 'center',
    },
    shieldTop: {
        width: 36,
        height: 26,
        backgroundColor: colors.textWhite,
        borderTopLeftRadius: 6,
        borderTopRightRadius: 6,
    },
    shieldBottom: {
        width: 0,
        height: 0,
        borderLeftWidth: 18,
        borderRightWidth: 18,
        borderTopWidth: 18,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderTopColor: colors.textWhite,
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
        fontWeight: '400',
    },
    keyboardAvoid: {
        flex: 1,
        marginTop: -25,
    },
    scrollContent: {
        flexGrow: 1,
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
    forgotPassword: {
        alignSelf: 'flex-end',
        marginTop: -spacing.sm,
        marginBottom: spacing.lg,
    },
    forgotPasswordText: {
        fontSize: 14,
        color: colors.primary,
        fontWeight: '600',
    },
    loginButton: {
        marginTop: spacing.sm,
    },
    divider: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: spacing.xl,
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: colors.border,
    },
    dividerTextContainer: {
        paddingHorizontal: spacing.md,
    },
    dividerText: {
        fontSize: 13,
        color: colors.textSecondary,
        fontWeight: '500',
    },
    socialContainer: {
        gap: spacing.md,
    },
    socialButton: {
        marginBottom: 0,
    },
    signupContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: spacing.xxl,
    },
    signupText: {
        fontSize: 15,
        color: colors.textSecondary,
    },
    signupLink: {
        fontSize: 15,
        color: colors.primary,
        fontWeight: '700',
    },
});

export default LoginScreen;
