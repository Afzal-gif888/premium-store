import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/announcements';

export const fetchAnnouncements = createAsyncThunk('announcements/fetchAnnouncements', async () => {
    const response = await axios.get(API_URL);
    return response.data;
});

export const addAnnouncement = createAsyncThunk('announcements/addAnnouncement', async (announcement) => {
    const response = await axios.post(API_URL, announcement);
    return response.data;
});

export const deleteAnnouncement = createAsyncThunk('announcements/deleteAnnouncement', async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    return id;
});

const initialState = {
    items: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null
};

const announcementSlice = createSlice({
    name: 'announcements',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAnnouncements.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchAnnouncements.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchAnnouncements.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(addAnnouncement.fulfilled, (state, action) => {
                state.items.unshift(action.payload);
            })
            .addCase(deleteAnnouncement.fulfilled, (state, action) => {
                state.items = state.items.filter(a => a._id !== action.payload);
            });
    },
});

export default announcementSlice.reducer;
