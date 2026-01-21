import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   partnership: {}
};

const PartnershipSlice = createSlice({
    name: 'PartnershipSlice',
    initialState,

    reducers: {
        setPartnership(state, action) {
            state.partnership = action.payload;
        },
    },
});

export const {
   setPartnership
} = PartnershipSlice.actions;

export default PartnershipSlice.reducer;
