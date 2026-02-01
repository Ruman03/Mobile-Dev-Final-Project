// Modern Geometric Back Icon
import React from 'react';
import { View, StyleSheet } from 'react-native';
import colors from '../styles/colors';

const BackIcon = ({ color = colors.textWhite, size = 16, thickness = 2.5 }) => {
    return (
        <View style={[styles.container, { width: size * 1.5, height: size * 1.5 }]}>
            <View
                style={[
                    styles.chevron,
                    {
                        width: size,
                        height: size,
                        borderTopWidth: thickness,
                        borderLeftWidth: thickness,
                        borderColor: color,
                    },
                ]}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        // Correction to visual center due to chevron shape
        paddingLeft: 4,
    },
    chevron: {
        transform: [{ rotate: '-45deg' }],
        backgroundColor: 'transparent',
        borderRadius: 1, // Slight rounding for "modern" feel
    },
});

export default BackIcon;
