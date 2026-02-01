// NEXUS Auth Navigator - Stack Navigation for Authentication Flow
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import ResetPasswordScreen from '../screens/ResetPasswordScreen';
import OTPScreen from '../screens/OTPScreen';
import HomeScreen from '../screens/HomeScreen';

const Stack = createStackNavigator();

const AuthNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName="Splash"
            screenOptions={{
                headerShown: false,
                cardStyle: { backgroundColor: 'transparent' },
            }}
        >
            <Stack.Screen
                name="Splash"
                component={SplashScreen}
                options={{
                    cardStyleInterpolator: ({ current }) => ({
                        cardStyle: {
                            opacity: current.progress,
                        },
                    }),
                }}
            />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
            <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
            <Stack.Screen name="OTP" component={OTPScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
    );
};

export default AuthNavigator;
