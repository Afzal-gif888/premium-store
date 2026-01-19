import { createSlice } from '@reduxjs/toolkit';

const loadPayments = () => {
    const saved = localStorage.getItem('paymentsData');
    return saved ? JSON.parse(saved) : [];
};

const initialState = {
    history: loadPayments(),
};

const paymentSlice = createSlice({
    name: 'payments',
    initialState,
    reducers: {
        addPayment: (state, action) => {
            state.history.unshift(action.payload);
            localStorage.setItem('paymentsData', JSON.stringify(state.history));
        },
        // No Edit/Delete allowed as per rules
    },
});

export const { addPayment } = paymentSlice.actions;
export default paymentSlice.reducer;
