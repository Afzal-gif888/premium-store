import { createSlice } from '@reduxjs/toolkit';

// Helper to load from localStorage
const loadStock = () => {
    const saved = localStorage.getItem('stockData');
    return saved ? JSON.parse(saved) : [];
};

const initialState = {
    products: loadStock(),
};

const stockSlice = createSlice({
    name: 'stock',
    initialState,
    reducers: {
        addProduct: (state, action) => {
            state.products.push(action.payload); // payload should be the full product object including variants
            localStorage.setItem('stockData', JSON.stringify(state.products));
        },
        updateProduct: (state, action) => {
            const index = state.products.findIndex(p => p.id === action.payload.id);
            if (index !== -1) {
                state.products[index] = action.payload;
                localStorage.setItem('stockData', JSON.stringify(state.products));
            }
        },
        deleteProduct: (state, action) => {
            state.products = state.products.filter(p => p.id !== action.payload);
            localStorage.setItem('stockData', JSON.stringify(state.products));
        },
        toggleBestseller: (state, action) => {
            const product = state.products.find(p => p.id === action.payload);
            if (product) {
                product.isBestseller = !product.isBestseller;
                localStorage.setItem('stockData', JSON.stringify(state.products));
            }
        }
    },
});

export const { addProduct, updateProduct, deleteProduct, toggleBestseller } = stockSlice.actions;
export default stockSlice.reducer;
