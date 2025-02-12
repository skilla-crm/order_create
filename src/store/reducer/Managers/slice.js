import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    managerId: null,
    partnershipId: null,
    emailPasport: ''
};

const ManagersSlice = createSlice({
    name: 'ManagersSlice',
    initialState,

    reducers: {
        setManagerId(state, action) {
            state.managerId = action.payload;
        },

        setPartnershipId(state, action) {
            state.partnershipId = action.payload;
        },

        setEmailPasport(state, action) {
            state.emailPasport = action.payload;
        }
    },
});

export const {
    setManagerId,
    setPartnershipId,
    setEmailPasport
} = ManagersSlice.actions;

export default ManagersSlice.reducer;
