// Fixed Custom Input Component - Proper Label Spacing
import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    TextInput,
    Text,
    StyleSheet,
    Animated,
    TouchableOpacity,
} from 'react-native';
import colors from '../styles/colors';
import spacing from '../styles/spacing';

const CustomInput = ({
    placeholder = '',
    value = '',
    onChangeText,
    secureTextEntry = false,
    keyboardType = 'default',
    icon = null,
    error = null,
    editable = true,
    autoCapitalize = 'none',
    maxLength,
    returnKeyType = 'next',
    onSubmitEditing,
    inputRef,
}) => {
    const [isFocused, setIsFocused] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const labelPosition = useRef(new Animated.Value(value ? 1 : 0)).current;

    const isActive = isFocused || value;

    useEffect(() => {
        Animated.timing(labelPosition, {
            toValue: isFocused || value ? 1 : 0,
            duration: 200,
            useNativeDriver: false,
        }).start();
    }, [isFocused, value]);

    const labelStyle = {
        position: 'absolute',
        left: icon ? 52 : 16,
        top: labelPosition.interpolate({
            inputRange: [0, 1],
            outputRange: [16, 6],
        }),
        fontSize: labelPosition.interpolate({
            inputRange: [0, 1],
            outputRange: [16, 11],
        }),
        color: error ? colors.error : isFocused ? colors.primary : colors.textSecondary,
        backgroundColor: colors.background,
        paddingHorizontal: 4,
    };

    const handleClear = () => {
        onChangeText && onChangeText('');
    };

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    const getBorderColor = () => {
        if (error) return colors.error;
        if (isFocused) return colors.primary;
        return colors.border;
    };

    // Icon components using simple shapes
    const renderIcon = () => {
        if (!icon) return null;

        const iconColor = error ? colors.error : isFocused ? colors.primary : colors.textLight;

        switch (icon) {
            case 'mail':
                return (
                    <View style={styles.iconShape}>
                        <View style={[styles.mailEnvelope, { borderColor: iconColor }]}>
                            <View style={[styles.mailFlap, { borderTopColor: iconColor }]} />
                        </View>
                    </View>
                );
            case 'lock':
                return (
                    <View style={styles.iconShape}>
                        <View style={[styles.lockBody, { backgroundColor: iconColor }]} />
                        <View style={[styles.lockShackle, { borderColor: iconColor }]} />
                    </View>
                );
            case 'user':
                return (
                    <View style={styles.iconShape}>
                        <View style={[styles.userHead, { backgroundColor: iconColor }]} />
                        <View style={[styles.userBody, { backgroundColor: iconColor }]} />
                    </View>
                );
            case 'phone':
                return (
                    <View style={styles.iconShape}>
                        <View style={[styles.phoneBody, { borderColor: iconColor }]}>
                            <View style={[styles.phoneScreen, { backgroundColor: iconColor }]} />
                        </View>
                    </View>
                );
            case 'key':
                return (
                    <View style={styles.iconShape}>
                        <View style={[styles.keyCircle, { borderColor: iconColor }]} />
                        <View style={[styles.keyBar, { backgroundColor: iconColor }]} />
                    </View>
                );
            default:
                return null;
        }
    };

    return (
        <View style={styles.container}>
            <View
                style={[
                    styles.inputContainer,
                    { borderColor: getBorderColor() },
                    isFocused && styles.inputContainerFocused,
                    !editable && styles.disabledContainer,
                ]}
            >
                {icon && <View style={styles.iconContainer}>{renderIcon()}</View>}

                <Animated.Text style={labelStyle}>{placeholder}</Animated.Text>

                <TextInput
                    ref={inputRef}
                    style={[
                        styles.input,
                        icon && styles.inputWithIcon,
                        (secureTextEntry || (value && editable)) && styles.inputWithRightIcon,
                        isActive && styles.inputActive,
                    ]}
                    value={value}
                    onChangeText={onChangeText}
                    secureTextEntry={secureTextEntry && !isPasswordVisible}
                    keyboardType={keyboardType}
                    editable={editable}
                    autoCapitalize={autoCapitalize}
                    maxLength={maxLength}
                    returnKeyType={returnKeyType}
                    onSubmitEditing={onSubmitEditing}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    placeholderTextColor="transparent"
                    selectionColor={colors.primary}
                />

                <View style={styles.rightIconsContainer}>
                    {value && editable && !secureTextEntry && (
                        <TouchableOpacity onPress={handleClear} style={styles.clearButton}>
                            <View style={styles.clearIcon}>
                                <View style={styles.clearLine1} />
                                <View style={styles.clearLine2} />
                            </View>
                        </TouchableOpacity>
                    )}

                    {secureTextEntry && (
                        <TouchableOpacity onPress={togglePasswordVisibility} style={styles.visibilityButton}>
                            <View style={styles.eyeIcon}>
                                <View style={[styles.eyeOuter, { borderColor: colors.textLight }]} />
                                <View style={[styles.eyePupil, { backgroundColor: colors.textLight }]} />
                                {!isPasswordVisible && <View style={styles.eyeSlash} />}
                            </View>
                        </TouchableOpacity>
                    )}
                </View>
            </View>

            {error && (
                <View style={styles.errorContainer}>
                    <View style={styles.errorIcon}>
                        <Text style={styles.errorIconText}>!</Text>
                    </View>
                    <Text style={styles.errorText}>{error}</Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: spacing.inputSpacing,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height: spacing.inputHeight,
        borderWidth: 1.5,
        borderRadius: spacing.borderRadius.md,
        backgroundColor: colors.background,
        position: 'relative',
    },
    inputContainerFocused: {
        borderWidth: 2,
    },
    disabledContainer: {
        backgroundColor: colors.backgroundSecondary,
        opacity: 0.7,
    },
    iconContainer: {
        paddingLeft: spacing.lg,
        justifyContent: 'center',
        alignItems: 'center',
        width: 44,
    },
    iconShape: {
        width: 22,
        height: 22,
        justifyContent: 'center',
        alignItems: 'center',
    },
    // Mail icon
    mailEnvelope: {
        width: 18,
        height: 14,
        borderWidth: 1.5,
        borderRadius: 2,
    },
    mailFlap: {
        position: 'absolute',
        top: -1,
        left: 2,
        width: 0,
        height: 0,
        borderLeftWidth: 6,
        borderRightWidth: 6,
        borderTopWidth: 6,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
    },
    // Lock icon
    lockBody: {
        width: 14,
        height: 10,
        borderRadius: 2,
        marginTop: 6,
    },
    lockShackle: {
        position: 'absolute',
        top: 0,
        width: 10,
        height: 8,
        borderWidth: 2,
        borderBottomWidth: 0,
        borderTopLeftRadius: 6,
        borderTopRightRadius: 6,
    },
    // User icon
    userHead: {
        width: 8,
        height: 8,
        borderRadius: 4,
    },
    userBody: {
        width: 14,
        height: 7,
        borderTopLeftRadius: 7,
        borderTopRightRadius: 7,
        marginTop: 2,
    },
    // Phone icon
    phoneBody: {
        width: 12,
        height: 18,
        borderWidth: 1.5,
        borderRadius: 3,
        alignItems: 'center',
    },
    phoneScreen: {
        width: 8,
        height: 12,
        borderRadius: 1,
        marginTop: 1,
    },
    // Key icon
    keyCircle: {
        width: 9,
        height: 9,
        borderRadius: 5,
        borderWidth: 2,
        position: 'absolute',
        left: 0,
        top: 2,
    },
    keyBar: {
        width: 12,
        height: 2,
        position: 'absolute',
        right: 0,
        top: 6,
        borderRadius: 1,
    },
    input: {
        flex: 1,
        height: '100%',
        paddingHorizontal: spacing.lg,
        paddingTop: 20,
        paddingBottom: 6,
        fontSize: 16,
        color: colors.textPrimary,
        fontWeight: '400',
    },
    inputWithIcon: {
        paddingLeft: spacing.sm,
    },
    inputWithRightIcon: {
        paddingRight: 50,
    },
    inputActive: {
        paddingTop: 22,
        paddingBottom: 4,
    },
    rightIconsContainer: {
        position: 'absolute',
        right: spacing.md,
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.sm,
    },
    clearButton: {
        padding: spacing.xs,
    },
    clearIcon: {
        width: 18,
        height: 18,
        justifyContent: 'center',
        alignItems: 'center',
    },
    clearLine1: {
        position: 'absolute',
        width: 12,
        height: 2,
        backgroundColor: colors.textLight,
        borderRadius: 1,
        transform: [{ rotate: '45deg' }],
    },
    clearLine2: {
        position: 'absolute',
        width: 12,
        height: 2,
        backgroundColor: colors.textLight,
        borderRadius: 1,
        transform: [{ rotate: '-45deg' }],
    },
    visibilityButton: {
        padding: spacing.xs,
    },
    eyeIcon: {
        width: 22,
        height: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    eyeOuter: {
        width: 18,
        height: 12,
        borderWidth: 1.5,
        borderRadius: 8,
    },
    eyePupil: {
        position: 'absolute',
        width: 6,
        height: 6,
        borderRadius: 3,
    },
    eyeSlash: {
        position: 'absolute',
        width: 2,
        height: 20,
        backgroundColor: colors.textLight,
        borderRadius: 1,
        transform: [{ rotate: '45deg' }],
    },
    errorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: spacing.xs,
        paddingHorizontal: spacing.sm,
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
        fontSize: 12,
        color: colors.error,
        fontWeight: '500',
    },
});

export default CustomInput;
