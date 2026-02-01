// Password Strength Indicator Component (No External Icons)
import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import colors from '../styles/colors';
import spacing from '../styles/spacing';
import { getPasswordStrength } from '../utils/validation';

const PasswordStrengthIndicator = ({ password }) => {
    const widthAnim = useRef(new Animated.Value(0)).current;
    const { level, score } = getPasswordStrength(password);

    useEffect(() => {
        const targetWidth = (score / 6) * 100;
        Animated.timing(widthAnim, {
            toValue: targetWidth,
            duration: 300,
            useNativeDriver: false,
        }).start();
    }, [score]);

    const getColor = () => {
        switch (level) {
            case 'weak':
                return colors.error;
            case 'medium':
                return colors.warning;
            case 'strong':
                return colors.success;
            default:
                return colors.border;
        }
    };

    const getLabel = () => {
        switch (level) {
            case 'weak':
                return 'Weak';
            case 'medium':
                return 'Medium';
            case 'strong':
                return 'Strong';
            default:
                return '';
        }
    };

    if (!password) return null;

    return (
        <View style={styles.container}>
            <View style={styles.barContainer}>
                <Animated.View
                    style={[
                        styles.bar,
                        {
                            width: widthAnim.interpolate({
                                inputRange: [0, 100],
                                outputRange: ['0%', '100%'],
                            }),
                            backgroundColor: getColor(),
                        },
                    ]}
                />
            </View>
            <View style={styles.labelContainer}>
                <View style={[styles.dot, { backgroundColor: getColor() }]} />
                <Text style={[styles.label, { color: getColor() }]}>{getLabel()}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: -spacing.sm,
        marginBottom: spacing.md,
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.md,
    },
    barContainer: {
        flex: 1,
        height: 6,
        backgroundColor: colors.borderLight,
        borderRadius: 3,
        overflow: 'hidden',
    },
    bar: {
        height: '100%',
        borderRadius: 3,
    },
    labelContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.xs,
    },
    dot: {
        width: 6,
        height: 6,
        borderRadius: 3,
    },
    label: {
        fontSize: 12,
        fontWeight: '600',
    },
});

export default PasswordStrengthIndicator;
