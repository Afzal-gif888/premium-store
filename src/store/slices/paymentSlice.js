import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const getApiBase = () => {
    const hostname = window.location.hostname;
    return `${window.location.protocol}//${hostname}:5000`;
};

const API_URL = `${getApiBase()}/api/payments`;

export const fetchPayments = createAsyncThunk('payments/fetchPayments', async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || 'Failed to fetch payments');
    }
});

export const addPayment = createAsyncThunk('payments/addPayment', async (paymentData, { rejectWithValue }) => {
    try {
        const response = await axios.post(API_URL, paymentData);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || 'Failed to add payment');
    }
});

const initialState = {
    history: [],
    status: 'idle',
    error: null
};

const paymentSlice = createSlice({
    name: 'payments',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPayments.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchPayments.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.history = action.payload;
            })
            .addCase(fetchPayments.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(addPayment.fulfilled, (state, action) => {
                state.history.unshift(action.payload);
            });
    },
});

export default paymentSlice.reducer;
