// Redux Auth Slice - Authentication State Management
// Handles signup, login, logout with JSON Server backend using Axios

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../api/client';

// Initial State
const initialState = {
    user: null,
    token: null,
    isLoading: false,
    error: null,
    isAuthenticated: false,
};

// Async Thunk: Signup User
export const signupUser = createAsyncThunk(
    'auth/signupUser',
    async (userData, { rejectWithValue }) => {
        try {
            // First, check if email already exists
            const checkResponse = await apiClient.get('/users', {
                params: { email: userData.email }
            });
            
            if (checkResponse.data.length > 0) {
                return rejectWithValue('An account with this email already exists.');
            }

            // Create new user
            const response = await apiClient.post('/users', {
                name: userData.name,
                email: userData.email,
                password: userData.password,
                createdAt: new Date().toISOString(),
            });

            const newUser = response.data;
            
            // Generate a simple token (in real app, this would come from server)
            const token = `nexus_${newUser.id}_${Date.now()}`;

            return {
                user: {
                    id: newUser.id,
                    name: newUser.name,
                    email: newUser.email,
                },
                token,
            };
        } catch (error) {
            // Axios automatically throws on non-2xx responses
            if (error.response) {
                // Server responded with error status
                return rejectWithValue(error.response.data.message || 'Signup failed. Please try again.');
            }
            // Network error or other issue
            return rejectWithValue(error.message || 'Signup failed. Please try again.');
        }
    }
);

// Async Thunk: Login User
export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await apiClient.get('/users', {
                params: {
                    email: credentials.email,
                    password: credentials.password
                }
            });

            // JSON Server returns array - check if credentials match
            if (response.data.length === 0) {
                return rejectWithValue('Invalid email or password.');
            }

            const user = response.data[0];
            
            // Generate a simple token (in real app, this would come from server)
            const token = `nexus_${user.id}_${Date.now()}`;

            return {
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                },
                token,
            };
        } catch (error) {
            // Axios automatically throws on non-2xx responses
            if (error.response) {
                return rejectWithValue(error.response.data.message || 'Login failed. Please try again.');
            }
            return rejectWithValue(error.message || 'Login failed. Please try again.');
        }
    }
);

// Async Thunk: Logout User
export const logoutUser = createAsyncThunk(
    'auth/logoutUser',
    async () => {
        // In a real app, you might want to invalidate the token on server
        // For now, we just clear local state
        return null;
    }
);

// Auth Slice
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // Clear error manually if needed
        clearError: (state) => {
            state.error = null;
        },
        // Reset auth state
        resetAuth: () => initialState,
    },
    extraReducers: (builder) => {
        // Signup Cases
        builder
            .addCase(signupUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(signupUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.isAuthenticated = true;
                state.error = null;
            })
            .addCase(signupUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || 'Signup failed';
                state.isAuthenticated = false;
            });

        // Login Cases
        builder
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.isAuthenticated = true;
                state.error = null;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || 'Login failed';
                state.isAuthenticated = false;
            });

        // Logout Cases
        builder
            .addCase(logoutUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.user = null;
                state.token = null;
                state.isLoading = false;
                state.isAuthenticated = false;
                state.error = null;
            });
    },
});

export const { clearError, resetAuth } = authSlice.actions;
export default authSlice.reducer;
