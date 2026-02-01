// Success Message with React Native Reanimated
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    withTiming,
    withDelay,
    runOnJS,
} from 'react-native-reanimated';
import colors from '../styles/colors';
import spacing from '../styles/spacing';

const { width } = Dimensions.get('window');

const SuccessMessage = ({ message, visible, onHide, duration = 3000 }) => {
    const translateY = useSharedValue(-100);
    const opacity = useSharedValue(0);

    useEffect(() => {
        if (visible) {
            // Slide in
            translateY.value = withSpring(0, {
                damping: 15,
                stiffness: 150,
            });
            opacity.value = withTiming(1, { duration: 200 });

            // Auto hide after duration
            const timer = setTimeout(() => {
                hideMessage();
            }, duration);

            return () => clearTimeout(timer);
        }
    }, [visible]);

    const hideMessage = () => {
        translateY.value = withTiming(-100, { duration: 250 });
        opacity.value = withTiming(0, { duration: 200 }, (finished) => {
            if (finished && onHide) {
                runOnJS(onHide)();
            }
        });
    };

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: translateY.value }],
        opacity: opacity.value,
    }));

    if (!visible) return null;

    return (
        <Animated.View style={[styles.container, animatedStyle]}>
            <View style={styles.iconContainer}>
                <View style={styles.checkmark}>
                    <View style={styles.checkLine1} />
                    <View style={styles.checkLine2} />
                </View>
            </View>
            <Text style={styles.text}>{message}</Text>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 50,
        left: 20,
        right: 20,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.successLight,
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.md,
        borderRadius: spacing.borderRadius.lg,
        borderLeftWidth: 4,
        borderLeftColor: colors.success,
        shadowColor: colors.success,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 6,
        zIndex: 1000,
    },
    iconContainer: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: colors.success,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: spacing.md,
    },
    checkmark: {
        width: 12,
        height: 8,
        position: 'relative',
    },
    checkLine1: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: 6,
        height: 2,
        backgroundColor: colors.textWhite,
        borderRadius: 1,
        transform: [{ rotate: '45deg' }],
    },
    checkLine2: {
        position: 'absolute',
        bottom: 2,
        left: 4,
        width: 10,
        height: 2,
        backgroundColor: colors.textWhite,
        borderRadius: 1,
        transform: [{ rotate: '-45deg' }],
    },
    text: {
        fontSize: 14,
        color: colors.successDark,
        flex: 1,
        fontWeight: '500',
    },
});

export default SuccessMessage;
