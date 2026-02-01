// API Configuration
// For Android Emulator: 10.0.2.2 points to host machine's localhost
// For Physical Device: Use your computer's local IP (e.g., 192.168.x.x)

import { Platform } from 'react-native';

// Automatically select the correct base URL based on platform
const getBaseUrl = () => {
    if (Platform.OS === 'android') {
        // Android Emulator uses 10.0.2.2 to access host machine's localhost
        return 'http://10.0.2.2:3000';
    } else if (Platform.OS === 'ios') {
        // iOS Simulator can use localhost directly
        return 'http://localhost:3000';
    }
    // Fallback for physical devices - change this to your machine's IP
    return 'http://192.168.1.100:3000';
};

export const BASE_URL = getBaseUrl();

// For physical device testing, uncomment and set your IP:
// export const BASE_URL = 'http://192.168.x.x:3000';

export default BASE_URL;
