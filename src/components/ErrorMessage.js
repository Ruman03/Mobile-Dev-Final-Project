// NEXUS ErrorMessage Component
// Reusable for both error and success message banners

import React, { useEffect, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Colors from '../constants/Colors';
import Typography from '../constants/Typography';
import Spacing from '../constants/Spacing';

const ErrorMessage = ({ message, type = 'error', visible = false }) => {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(-8)).current;

    useEffect(() => {
        if (visible) {
            Animated.parallel([
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 250,
                    useNativeDriver: true,
                }),
                Animated.timing(slideAnim, {
                    toValue: 0,
                    duration: 250,
                    useNativeDriver: true,
                }),
            ]).start();
        } else {
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 200,
                useNativeDriver: true,
            }).start();
        }
    }, [visible]);

    if (!visible && fadeAnim._value === 0) {
        return null;
    }

    const isError = type === 'error';
    const backgroundColor = isError ? Colors.error.background : Colors.success.background;
    const textColor = isError ? Colors.error.text : Colors.success.text;
    const iconName = isError ? 'warning' : 'information-circle';

    return (
        <Animated.View
            style={[
                styles.container,
                { backgroundColor },
                {
                    opacity: fadeAnim,
                    transform: [{ translateY: slideAnim }],
                },
            ]}
        >
            <Icon
                name={iconName}
                size={16}
                color={textColor}
                style={styles.icon}
            />
            <Text style={[styles.text, { color: textColor }]}>
                {message}
            </Text>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 14,
        borderRadius: Spacing.radius.message,
    },
    icon: {
        marginRight: Spacing.sm,
    },
    text: {
        ...Typography.message,
        flex: 1,
    },
});

export default ErrorMessage;
