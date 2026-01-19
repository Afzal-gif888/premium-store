import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/products';

export const fetchProducts = createAsyncThunk('stock/fetchProducts', async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get(API_URL);
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

export const toggleBestseller = createAsyncThunk('stock/toggleBestseller', async ({ id, isBestseller }) => {
    // We assume the caller sends the inverted value or we fetch the product first.
    // Simplifying: The Admin UI should probably pass the full updated object or we patch.
    // For now, let's fetch, toggle, and update (not efficient but safe) or just use updateProduct.
    // Actually, let's make this use updateProduct internally in the UI, or just patch here.
    // Creating a dedicated PATCH endpoint would be better, but reusing PUT for now is okay if we send full data.
    // Let's assume the UI handles the logic and calls updateProduct. 
    // BUT to keep the action name:
    const response = await axios.put(`${API_URL}/${id}`, { isBestseller });
    return response.data;
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
                state.products = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(addProduct.fulfilled, (state, action) => {
                state.products.push(action.payload);
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                const index = state.products.findIndex(p => p._id === action.payload._id);
                if (index !== -1) {
                    state.products[index] = action.payload;
                }
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.products = state.products.filter(p => p._id !== action.payload);
            })
            .addCase(toggleBestseller.fulfilled, (state, action) => {
                const index = state.products.findIndex(p => p._id === action.payload._id);
                if (index !== -1) {
                    state.products[index] = action.payload;
                }
            });
    },
});

export default stockSlice.reducer;
