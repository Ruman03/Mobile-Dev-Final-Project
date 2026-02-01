// NEXUS SocialButton Component
// Google and Facebook social login buttons

import React from 'react';
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from '../constants/Colors';
import Typography from '../constants/Typography';
import Spacing from '../constants/Spacing';

const SocialButton = ({ type, onPress }) => {
    const isGoogle = type === 'google';
    const backgroundColor = isGoogle ? Colors.social.google : Colors.social.facebook;
    const iconName = isGoogle ? 'google' : 'facebook';
    const label = isGoogle ? 'Google' : 'Facebook';

    const handlePress = () => {
        console.log(`[Social Login] ${label} pressed`);
        if (onPress) {
            onPress();
        }
    };

    return (
        <TouchableOpacity
            style={[styles.button, { backgroundColor }]}
            onPress={handlePress}
            activeOpacity={0.7}
        >
            <View style={styles.content}>
                <Icon
                    name={iconName}
                    size={Spacing.icon.medium}
                    color={Colors.text.primary}
                    style={styles.icon}
                />
                <Text style={styles.text}>{label}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        flex: 1,
        height: Spacing.socialButtonHeight,
        borderRadius: Spacing.radius.social,
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        marginRight: Spacing.sm,
    },
    text: {
        ...Typography.socialButton,
    },
});

export default SocialButton;
