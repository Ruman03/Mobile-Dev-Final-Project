// Custom Button with React Native Reanimated for 60fps animations
import React from 'react';
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    ActivityIndicator,
    View,
} from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    withTiming,
} from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../styles/colors';
import spacing from '../styles/spacing';

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

const CustomButton = ({
    title,
    onPress,
    loading = false,
    disabled = false,
    variant = 'primary', // 'primary', 'secondary', 'outline', 'text'
    icon = null,
    style,
}) => {
    const scale = useSharedValue(1);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));

    const handlePressIn = () => {
        scale.value = withSpring(0.96, {
            damping: 15,
            stiffness: 400,
        });
    };

    const handlePressOut = () => {
        scale.value = withSpring(1, {
            damping: 15,
            stiffness: 400,
        });
    };

    const renderContent = () => {
        if (loading) {
            return (
                <ActivityIndicator
                    color={variant === 'outline' || variant === 'text' ? colors.primary : colors.textWhite}
                    size="small"
                />
            );
        }

        return (
            <View style={styles.contentContainer}>
                {icon && <View style={styles.iconContainer}>{icon}</View>}
                <Text
                    style={[
                        styles.buttonText,
                        variant === 'outline' && styles.outlineText,
                        variant === 'text' && styles.textVariantText,
                        disabled && styles.disabledText,
                    ]}
                >
                    {title}
                </Text>
            </View>
        );
    };

    // Disabled state - simple gray button
    if (disabled && (variant === 'primary' || variant === 'secondary')) {
        return (
            <Animated.View style={[animatedStyle, style]}>
                <View style={styles.disabledButton}>
                    {renderContent()}
                </View>
            </Animated.View>
        );
    }

    if (variant === 'primary' || variant === 'secondary') {
        const gradientColors = variant === 'secondary'
            ? colors.gradientAccent
            : colors.gradientPrimary;

        return (
            <Animated.View style={[animatedStyle, style]}>
                <TouchableOpacity
                    onPress={onPress}
                    onPressIn={handlePressIn}
                    onPressOut={handlePressOut}
                    disabled={loading}
                    activeOpacity={1}
                >
                    <LinearGradient
                        colors={gradientColors}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.gradientButton}
                    >
                        {renderContent()}
                    </LinearGradient>
                </TouchableOpacity>
            </Animated.View>
        );
    }

    return (
        <Animated.View style={[animatedStyle, style]}>
            <TouchableOpacity
                style={[
                    styles.button,
                    variant === 'outline' && styles.outlineButton,
                    variant === 'text' && styles.textButton,
                    disabled && styles.disabledOutlineButton,
                ]}
                onPress={onPress}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                disabled={disabled || loading}
                activeOpacity={1}
            >
                {renderContent()}
            </TouchableOpacity>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    button: {
        height: spacing.buttonHeight,
        borderRadius: spacing.borderRadius.md,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: spacing.xl,
    },
    gradientButton: {
        height: spacing.buttonHeight,
        borderRadius: spacing.borderRadius.md,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: spacing.xl,
        shadowColor: colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
    },
    outlineButton: {
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: colors.primary,
    },
    textButton: {
        backgroundColor: 'transparent',
        height: 'auto',
        paddingHorizontal: spacing.sm,
        paddingVertical: spacing.sm,
    },
    disabledButton: {
        height: spacing.buttonHeight,
        borderRadius: spacing.borderRadius.md,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: spacing.xl,
        backgroundColor: colors.border,
    },
    disabledOutlineButton: {
        borderColor: colors.border,
        opacity: 0.6,
    },
    disabledText: {
        color: colors.textSecondary,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '600',
        color: colors.textWhite,
        letterSpacing: 0.5,
    },
    outlineText: {
        color: colors.primary,
    },
    textVariantText: {
        color: colors.primary,
    },
    contentContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconContainer: {
        marginRight: spacing.sm,
    },
});

export default CustomButton;
