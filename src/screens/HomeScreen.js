// NEXUS Home Screen
// Displays welcome message with user name and logout functionality
// Integrated with Redux Toolkit for state management

import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    Image,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../redux/authSlice';
import CustomButton from '../components/CustomButton';
import Colors from '../constants/Colors';
import Typography from '../constants/Typography';
import Spacing from '../constants/Spacing';

const HomeScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const { user, isLoading } = useSelector((state) => state.auth);

    const handleLogout = async () => {
        await dispatch(logoutUser());
        navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
        });
    };

    return (
        <View style={styles.container}>
            <StatusBar
                barStyle="light-content"
                backgroundColor={Colors.background.primary}
            />

            <View style={styles.content}>
                {/* Logo */}
                <Image
                    source={require('../assets/icons/nexus-logo.png')}
                    style={styles.logo}
                    resizeMode="contain"
                />
                <View style={styles.textcontent}>

                {/* Welcome Text */}
                <Text style={styles.welcomeText}>
                    Welcome{user?.name ? `, ${user.name}` : ' Home'}
                </Text>

                {/* Logout Button */}
                <View style={styles.buttonContainer}>
                    <CustomButton
                        title="Log Out"
                        onPress={handleLogout}
                        loading={isLoading}
                        />
                </View>
                </View>
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
        paddingHorizontal: Spacing.screen.paddingH,
        // backgroundColor:"red",
    },
    logo: {
        width: 400,
        height: 400,
        position:"absolute",
        top:200,
        // backgroundColor:"blue",
    },
    welcomeText: {
        fontSize: 24,
        fontWeight: '700',
        color: Colors.text.primary,
        marginTop: 0,
    },
    buttonContainer: {
        width: '100%',
        marginTop: Spacing.xl,
    },
    textcontent:{
        // backgroundColor: "green",
        position:"absolute",
        bottom:300,
        alignItems:"center",
        width:"100%",
        paddingHorizontal: Spacing.screen.paddingH,
    }
});

export default HomeScreen;
