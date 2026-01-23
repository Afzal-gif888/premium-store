import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_ENDPOINTS } from 'config/api';

const API_URL = API_ENDPOINTS.PRODUCTS;

export const fetchProducts = createAsyncThunk('stock/fetchProducts', async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${API_URL}?t=${Date.now()}`);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch products:', error.message);
        return rejectWithValue(error.response?.data || 'Failed to load products');
    }
});

export const addProduct = createAsyncThunk('stock/addProduct', async (product, { rejectWithValue }) => {
    try {
        const response = await axios.post(API_URL, product);
        return response.data;
    } catch (error) {
        console.error('Failed to add product:', error.message);
        return rejectWithValue(error.response?.data || 'Failed to add product');
    }
});

export const updateProduct = createAsyncThunk('stock/updateProduct', async ({ id, data }, { rejectWithValue }) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, data);
        return response.data;
    } catch (error) {
        console.error('Failed to update product:', error.message);
        return rejectWithValue(error.response?.data || 'Failed to update product');
    }
});

export const deleteProduct = createAsyncThunk('stock/deleteProduct', async (id, { rejectWithValue }) => {
    try {
        await axios.delete(`${API_URL}/${id}`);
        return id;
    } catch (error) {
        console.error('Failed to delete product:', error.message);
        return rejectWithValue(error.response?.data || 'Failed to delete product');
    }
});

export const toggleBestseller = createAsyncThunk('stock/toggleBestseller', async ({ id, isBestseller }, { rejectWithValue }) => {
    try {
        const response = await axios.patch(`${API_URL}/${id}/bestseller`, { isBestseller });
        return response.data;
    } catch (error) {
        console.error('Failed to toggle bestseller:', error.message);
        return rejectWithValue(error.response?.data || 'Failed to toggle bestseller');
    }
});

const initialState = {
    products: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null
};

const stockSlice = createSlice({
    name: 'stock',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.products = Array.isArray(action.payload) ? action.payload : [];
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = (typeof action.payload === 'string' ? action.payload : action.payload?.message) || action.error.message;
            })
            .addCase(addProduct.fulfilled, (state, action) => {
                state.products.push(action.payload);
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                const updated = action.payload;
                const index = state.products.findIndex(p => (p._id || p.id) === (updated._id || updated.id));
                if (index !== -1) {
                    state.products[index] = updated;
                }
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.products = state.products.filter(p => (p._id || p.id) !== action.payload);
            })
            .addCase(toggleBestseller.pending, (state) => {
                state.status = 'updating';
            })
            .addCase(toggleBestseller.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const updated = action.payload;
                const index = state.products.findIndex(p => (p._id || p.id) === (updated._id || updated.id));
                if (index !== -1) {
                    state.products[index] = updated;
                }
            })
            .addCase(toggleBestseller.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload || action.error.message;
            });
    },
});

export default stockSlice.reducer;
