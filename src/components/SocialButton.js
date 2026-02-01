// Premium Social Button Component (No External Icons)
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import colors from '../styles/colors';
import spacing from '../styles/spacing';

const SocialButton = ({ provider, onPress, style }) => {
    const getProviderConfig = () => {
        switch (provider) {
            case 'google':
                return {
                    label: 'Continue with Google',
                    backgroundColor: colors.background,
                    textColor: colors.textPrimary,
                    borderColor: colors.border,
                };
            case 'facebook':
                return {
                    label: 'Continue with Facebook',
                    backgroundColor: colors.facebook,
                    textColor: colors.textWhite,
                    borderColor: colors.facebook,
                };
            case 'apple':
                return {
                    label: 'Continue with Apple',
                    backgroundColor: colors.apple,
                    textColor: colors.textWhite,
                    borderColor: colors.apple,
                };
            default:
                return {
                    label: 'Continue',
                    backgroundColor: colors.background,
                    textColor: colors.textPrimary,
                    borderColor: colors.border,
                };
        }
    };

    const renderIcon = () => {
        switch (provider) {
            case 'google':
                return (
                    <View style={styles.googleIcon}>
                        <View style={styles.googleG}>
                            <View style={[styles.googleArc, { borderColor: '#EA4335' }]} />
                            <View style={[styles.googleArc2, { borderColor: '#FBBC05' }]} />
                            <View style={[styles.googleArc3, { borderColor: '#34A853' }]} />
                            <View style={[styles.googleBar, { backgroundColor: '#4285F4' }]} />
                        </View>
                    </View>
                );
            case 'facebook':
                return (
                    <View style={styles.fbIcon}>
                        <Text style={styles.fbLetter}>f</Text>
                    </View>
                );
            case 'apple':
                return (
                    <View style={styles.appleIcon}>
                        <View style={styles.appleBite} />
                        <View style={styles.appleBody} />
                        <View style={styles.appleLeaf} />
                    </View>
                );
            default:
                return null;
        }
    };

    const config = getProviderConfig();

    return (
        <TouchableOpacity
            style={[
                styles.button,
                {
                    backgroundColor: config.backgroundColor,
                    borderColor: config.borderColor,
                },
                style,
            ]}
            onPress={onPress}
            activeOpacity={0.8}
        >
            <View style={styles.iconContainer}>{renderIcon()}</View>
            <Text style={[styles.label, { color: config.textColor }]}>{config.label}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: spacing.socialButtonHeight,
        borderRadius: spacing.borderRadius.lg,
        borderWidth: 1.5,
        paddingHorizontal: spacing.lg,
        shadowColor: colors.shadowDark,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    iconContainer: {
        width: 24,
        height: 24,
        marginRight: spacing.md,
        justifyContent: 'center',
        alignItems: 'center',
    },
    label: {
        fontSize: 15,
        fontWeight: '600',
    },
    // Google Icon
    googleIcon: {
        width: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    googleG: {
        width: 18,
        height: 18,
        position: 'relative',
    },
    googleArc: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: 18,
        height: 18,
        borderWidth: 3,
        borderRadius: 9,
        borderBottomColor: 'transparent',
        borderLeftColor: 'transparent',
    },
    googleArc2: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: 9,
        height: 9,
        borderWidth: 3,
        borderRadius: 9,
        borderTopColor: 'transparent',
        borderRightColor: 'transparent',
    },
    googleArc3: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: 9,
        height: 9,
        borderWidth: 3,
        borderRadius: 9,
        borderTopColor: 'transparent',
        borderLeftColor: 'transparent',
    },
    googleBar: {
        position: 'absolute',
        right: 0,
        top: 6,
        width: 10,
        height: 3,
        borderRadius: 1,
    },
    // Facebook Icon
    fbIcon: {
        width: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    fbLetter: {
        fontSize: 18,
        fontWeight: '700',
        color: colors.textWhite,
    },
    // Apple Icon
    appleIcon: {
        width: 18,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    appleBite: {
        position: 'absolute',
        top: 5,
        left: 0,
        width: 5,
        height: 5,
        borderRadius: 3,
        backgroundColor: colors.apple,
    },
    appleBody: {
        width: 14,
        height: 16,
        backgroundColor: colors.textWhite,
        borderRadius: 7,
        marginTop: 4,
    },
    appleLeaf: {
        position: 'absolute',
        top: 0,
        right: 4,
        width: 4,
        height: 6,
        backgroundColor: colors.textWhite,
        borderRadius: 2,
        transform: [{ rotate: '45deg' }],
    },
});

export default SocialButton;
