// Premium Splash Screen with Beautiful Animations
import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, StatusBar, Easing } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../styles/colors';
import typography from '../styles/typography';
import spacing from '../styles/spacing';

const SplashScreen = ({ navigation }) => {
    const logoScale = useRef(new Animated.Value(0.3)).current;
    const logoOpacity = useRef(new Animated.Value(0)).current;
    const logoRotate = useRef(new Animated.Value(0)).current;
    const ringScale1 = useRef(new Animated.Value(0.8)).current;
    const ringScale2 = useRef(new Animated.Value(0.8)).current;
    const ringScale3 = useRef(new Animated.Value(0.8)).current;
    const ringOpacity1 = useRef(new Animated.Value(0)).current;
    const ringOpacity2 = useRef(new Animated.Value(0)).current;
    const ringOpacity3 = useRef(new Animated.Value(0)).current;
    const titleTranslateY = useRef(new Animated.Value(30)).current;
    const titleOpacity = useRef(new Animated.Value(0)).current;
    const taglineTranslateY = useRef(new Animated.Value(20)).current;
    const taglineOpacity = useRef(new Animated.Value(0)).current;
    const dotsOpacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        // Logo entrance animation
        Animated.parallel([
            Animated.spring(logoScale, {
                toValue: 1,
                tension: 50,
                friction: 7,
                useNativeDriver: true,
            }),
            Animated.timing(logoOpacity, {
                toValue: 1,
                duration: 600,
                useNativeDriver: true,
            }),
        ]).start();

        // Pulsing rings animation
        const pulseRing = (scale, opacity, delay) => {
            return Animated.loop(
                Animated.sequence([
                    Animated.delay(delay),
                    Animated.parallel([
                        Animated.timing(scale, {
                            toValue: 1.5,
                            duration: 1500,
                            easing: Easing.out(Easing.ease),
                            useNativeDriver: true,
                        }),
                        Animated.timing(opacity, {
                            toValue: 0.6,
                            duration: 300,
                            useNativeDriver: true,
                        }),
                    ]),
                    Animated.timing(opacity, {
                        toValue: 0,
                        duration: 1200,
                        useNativeDriver: true,
                    }),
                    Animated.timing(scale, {
                        toValue: 0.8,
                        duration: 0,
                        useNativeDriver: true,
                    }),
                ])
            );
        };

        pulseRing(ringScale1, ringOpacity1, 0).start();
        pulseRing(ringScale2, ringOpacity2, 500).start();
        pulseRing(ringScale3, ringOpacity3, 1000).start();

        // Title animation
        setTimeout(() => {
            Animated.parallel([
                Animated.spring(titleTranslateY, {
                    toValue: 0,
                    tension: 50,
                    friction: 8,
                    useNativeDriver: true,
                }),
                Animated.timing(titleOpacity, {
                    toValue: 1,
                    duration: 400,
                    useNativeDriver: true,
                }),
            ]).start();
        }, 400);

        // Tagline animation
        setTimeout(() => {
            Animated.parallel([
                Animated.spring(taglineTranslateY, {
                    toValue: 0,
                    tension: 50,
                    friction: 8,
                    useNativeDriver: true,
                }),
                Animated.timing(taglineOpacity, {
                    toValue: 1,
                    duration: 400,
                    useNativeDriver: true,
                }),
            ]).start();
        }, 600);

        // Dots animation
        setTimeout(() => {
            Animated.timing(dotsOpacity, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }).start();
        }, 800);

        // Navigate to Login
        const timer = setTimeout(() => {
            navigation.replace('Login');
        }, 3000);

        return () => clearTimeout(timer);
    }, [navigation]);

    return (
        <LinearGradient
            colors={colors.gradientOcean}
            style={styles.container}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
        >
            <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

            {/* Decorative circles */}
            <View style={styles.decorCircle1} />
            <View style={styles.decorCircle2} />
            <View style={styles.decorCircle3} />

            <View style={styles.content}>
                {/* Pulsing Rings */}
                <View style={styles.logoWrapper}>
                    <Animated.View
                        style={[
                            styles.ring,
                            {
                                transform: [{ scale: ringScale1 }],
                                opacity: ringOpacity1,
                            },
                        ]}
                    />
                    <Animated.View
                        style={[
                            styles.ring,
                            styles.ring2,
                            {
                                transform: [{ scale: ringScale2 }],
                                opacity: ringOpacity2,
                            },
                        ]}
                    />
                    <Animated.View
                        style={[
                            styles.ring,
                            styles.ring3,
                            {
                                transform: [{ scale: ringScale3 }],
                                opacity: ringOpacity3,
                            },
                        ]}
                    />

                    {/* Logo */}
                    <Animated.View
                        style={[
                            styles.logoContainer,
                            {
                                transform: [{ scale: logoScale }],
                                opacity: logoOpacity,
                            },
                        ]}
                    >
                        <View style={styles.logoInner}>
                            <View style={styles.shieldShape}>
                                <View style={styles.shieldTop} />
                                <View style={styles.shieldBottom} />
                                <View style={styles.shieldCheck}>
                                    <View style={styles.checkLine1} />
                                    <View style={styles.checkLine2} />
                                </View>
                            </View>
                        </View>
                    </Animated.View>
                </View>

                {/* App Name */}
                <Animated.Text
                    style={[
                        styles.appName,
                        {
                            transform: [{ translateY: titleTranslateY }],
                            opacity: titleOpacity,
                        },
                    ]}
                >
                    AuthApp
                </Animated.Text>

                {/* Tagline */}
                <Animated.Text
                    style={[
                        styles.tagline,
                        {
                            transform: [{ translateY: taglineTranslateY }],
                            opacity: taglineOpacity,
                        },
                    ]}
                >
                    Secure • Simple • Seamless
                </Animated.Text>
            </View>

            {/* Loading Dots */}
            <Animated.View style={[styles.dotsContainer, { opacity: dotsOpacity }]}>
                <LoadingDots />
            </Animated.View>
        </LinearGradient>
    );
};

// Animated Loading Dots Component
const LoadingDots = () => {
    const dot1 = useRef(new Animated.Value(0)).current;
    const dot2 = useRef(new Animated.Value(0)).current;
    const dot3 = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const animateDot = (dot, delay) => {
            return Animated.loop(
                Animated.sequence([
                    Animated.delay(delay),
                    Animated.timing(dot, {
                        toValue: -8,
                        duration: 300,
                        easing: Easing.out(Easing.ease),
                        useNativeDriver: true,
                    }),
                    Animated.timing(dot, {
                        toValue: 0,
                        duration: 300,
                        easing: Easing.in(Easing.ease),
                        useNativeDriver: true,
                    }),
                ])
            );
        };

        animateDot(dot1, 0).start();
        animateDot(dot2, 150).start();
        animateDot(dot3, 300).start();
    }, []);

    return (
        <View style={styles.dotsRow}>
            <Animated.View style={[styles.dot, { transform: [{ translateY: dot1 }] }]} />
            <Animated.View style={[styles.dot, { transform: [{ translateY: dot2 }] }]} />
            <Animated.View style={[styles.dot, { transform: [{ translateY: dot3 }] }]} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    decorCircle1: {
        position: 'absolute',
        top: -100,
        right: -100,
        width: 300,
        height: 300,
        borderRadius: 150,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
    decorCircle2: {
        position: 'absolute',
        bottom: -50,
        left: -100,
        width: 250,
        height: 250,
        borderRadius: 125,
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
    },
    decorCircle3: {
        position: 'absolute',
        top: '40%',
        left: -50,
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
    },
    content: {
        alignItems: 'center',
    },
    logoWrapper: {
        width: 160,
        height: 160,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: spacing.xxl,
    },
    ring: {
        position: 'absolute',
        width: 140,
        height: 140,
        borderRadius: 70,
        borderWidth: 2,
        borderColor: 'rgba(255, 255, 255, 0.5)',
    },
    ring2: {
        borderColor: 'rgba(255, 255, 255, 0.4)',
    },
    ring3: {
        borderColor: 'rgba(255, 255, 255, 0.3)',
    },
    logoContainer: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: 'rgba(255, 255, 255, 0.3)',
    },
    logoInner: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: colors.textWhite,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 16,
        elevation: 16,
    },
    shieldShape: {
        width: 50,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
    shieldTop: {
        position: 'absolute',
        top: 0,
        width: 50,
        height: 35,
        backgroundColor: '#667EEA',
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
    },
    shieldBottom: {
        position: 'absolute',
        bottom: 0,
        width: 0,
        height: 0,
        borderLeftWidth: 25,
        borderRightWidth: 25,
        borderTopWidth: 30,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderTopColor: '#667EEA',
    },
    shieldCheck: {
        position: 'absolute',
        top: 18,
        width: 24,
        height: 18,
    },
    checkLine1: {
        position: 'absolute',
        bottom: 4,
        left: 2,
        width: 10,
        height: 3,
        backgroundColor: colors.textWhite,
        borderRadius: 2,
        transform: [{ rotate: '45deg' }],
    },
    checkLine2: {
        position: 'absolute',
        bottom: 6,
        right: 2,
        width: 16,
        height: 3,
        backgroundColor: colors.textWhite,
        borderRadius: 2,
        transform: [{ rotate: '-45deg' }],
    },
    appName: {
        fontSize: 36,
        fontWeight: '700',
        color: colors.textWhite,
        marginBottom: spacing.sm,
        letterSpacing: 1,
    },
    tagline: {
        fontSize: 16,
        fontWeight: '400',
        color: 'rgba(255, 255, 255, 0.9)',
        letterSpacing: 2,
    },
    dotsContainer: {
        position: 'absolute',
        bottom: 80,
    },
    dotsRow: {
        flexDirection: 'row',
        gap: spacing.sm,
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
    },
});

export default SplashScreen;
