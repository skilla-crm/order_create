import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    phoneModal: false,
};

const PreviewSlice = createSlice({
    name: 'PreviewSlice',
    initialState,

    reducers: {
        setPhoneModal(state, action) {
            state.phoneModal = action.payload;
        },
    },
});

export const {
    setPhoneModal
} = PreviewSlice.actions;

export default PreviewSlice.reducer;
