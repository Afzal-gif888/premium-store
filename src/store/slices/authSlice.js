import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isAuthenticated: localStorage.getItem('isAdminAuthenticated') === 'true',
    user: localStorage.getItem('adminUser') || null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            const { username, password } = action.payload;
            // STRICT CREDENTIAL CHECK
            if (username === 'chandpeera786@gmail.com' && password === 'peera143@') {
                state.isAuthenticated = true;
                state.user = username;
                localStorage.setItem('isAdminAuthenticated', 'true');
                localStorage.setItem('adminUser', username);
            } else {
                // We can throw an error or handle it in the UI component by checking state
                state.isAuthenticated = false;
                state.user = null;
            }
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.user = null;
            localStorage.removeItem('isAdminAuthenticated');
            localStorage.removeItem('adminUser');
        },
    },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
