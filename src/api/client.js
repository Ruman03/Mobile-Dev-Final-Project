// Axios Client Configuration
// Centralized HTTP client with base URL and default headers
// For Android Emulator: 10.0.2.2 maps to host machine's localhost

import axios from 'axios';
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

// Create Axios instance with default configuration
const apiClient = axios.create({
    baseURL: getBaseUrl(),
    timeout: 10000, // 10 second timeout
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
});

// Request interceptor (optional - for adding auth tokens later)
apiClient.interceptors.request.use(
    (config) => {
        // You can add authorization headers here
        // const token = store.getState().auth.token;
        // if (token) {
        //     config.headers.Authorization = `Bearer ${token}`;
        // }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor (optional - for global error handling)
apiClient.interceptors.response.use(
    (response) => {
        // Return only the data for cleaner responses
        return response;
    },
    (error) => {
        // Handle network errors
        if (!error.response) {
            error.message = 'Cannot connect to server. Make sure JSON Server is running.';
        }
        return Promise.reject(error);
    }
);

export default apiClient;
