// NEXUS BackButton Component
// Left chevron navigation button with 44x44 touch target

import React from 'react';
import {
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Colors from '../constants/Colors';
import Spacing from '../constants/Spacing';

const BackButton = ({ onPress }) => {
    return (
        <TouchableOpacity
            style={styles.button}
            onPress={onPress}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
            <Icon
                name="chevron-back"
                size={Spacing.icon.large}
                color={Colors.text.primary}
            />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        width: Spacing.touchTarget,
        height: Spacing.touchTarget,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default BackButton;
