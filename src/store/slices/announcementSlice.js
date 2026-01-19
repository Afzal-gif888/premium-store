import { createSlice } from '@reduxjs/toolkit';

const loadAnnouncements = () => {
    const saved = localStorage.getItem('announcementsData');
    return saved ? JSON.parse(saved) : [];
};

const initialState = {
    items: loadAnnouncements(),
};

const announcementSlice = createSlice({
    name: 'announcements',
    initialState,
    reducers: {
        addAnnouncement: (state, action) => {
            // For Hero section, we might simple act as a list, or the latest one is the Hero.
            state.items.unshift(action.payload); // Add to top
            localStorage.setItem('announcementsData', JSON.stringify(state.items));
        },
        deleteAnnouncement: (state, action) => {
            state.items = state.items.filter(a => a.id !== action.payload);
            localStorage.setItem('announcementsData', JSON.stringify(state.items));
        },
        updateAnnouncement: (state, action) => {
            const index = state.items.findIndex(a => a.id === action.payload.id);
            if (index !== -1) {
                state.items[index] = action.payload;
                localStorage.setItem('announcementsData', JSON.stringify(state.items));
            }
        }
    },
});

export const { addAnnouncement, deleteAnnouncement, updateAnnouncement } = announcementSlice.actions;
export default announcementSlice.reducer;
