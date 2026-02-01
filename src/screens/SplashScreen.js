// NEXUS Splash Screen
// Logo with loading bar animation, auto-transition after 2.5s

import React, { useEffect, useRef } from 'react';
import {
    View,
    StyleSheet,
    StatusBar,
    Animated,
    Dimensions,
    Image,
} from 'react-native';
import Colors from '../constants/Colors';
import Spacing from '../constants/Spacing';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const SplashScreen = ({ navigation }) => {
    const loadingPosition = useRef(new Animated.Value(-Spacing.loadingBar.width)).current;

    // Loading bar animation
    useEffect(() => {
        const loadingAnimation = Animated.loop(
            Animated.timing(loadingPosition, {
                toValue: SCREEN_WIDTH,
                duration: 1200,
                useNativeDriver: true,
            })
        );
        loadingAnimation.start();

        return () => loadingAnimation.stop();
    }, []);

    // Auto-navigate after 2.5 seconds
    useEffect(() => {
        const timer = setTimeout(() => {
            navigation.replace('Login');
        }, 2500);

        return () => clearTimeout(timer);
    }, [navigation]);

    return (
        <View style={styles.container}>
            <StatusBar
                barStyle="light-content"
                backgroundColor={Colors.background.primary}
                translucent={false}
            />

            {/* Centered Content */}
            <View style={styles.content}>
                {/* Logo with Text (includes NEXUS branding) */}
                <Image
                    source={require('../assets/icons/nexus-logo.png')}
                    style={styles.logo}
                    resizeMode="contain"
                />
            </View>

            {/* Loading Bar at Bottom */}
            <View style={styles.loadingContainer}>
                <Animated.View
                    style={[
                        styles.loadingBar,
                        {
                            transform: [{ translateX: loadingPosition }],
                        },
                    ]}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background.primary,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 400,
        height: 400,
    },
    loadingContainer: {
        position: 'absolute',
        bottom: Spacing.loadingBar.bottomOffset,
        left: 0,
        right: 0,
        alignItems: 'center',
        overflow: 'hidden',
    },
    loadingBar: {
        width: Spacing.loadingBar.width,
        height: Spacing.loadingBar.height,
        backgroundColor: Colors.accent.primary,
        borderRadius: 2,
    },
});

export default SplashScreen;
