import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    managerId: null,
    partnershipId: null,
    emailPasport: '',
    partnerRates: [],
    partnerRate: 0,
    emailState: false,
    fromPartnership: 0,
    acceptStatus: 1,
    fromLk: false
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
        },

        setPartnerRates(state, action) {
            state.partnerRates = action.payload;
        },

        setPartnerRate(state, action) {
            state.partnerRate = action.payload;
        },

        setEmailState(state, action) {
            state.emailState = action.payload;
        },

        setFromPartnership(state, action) {
            state.fromPartnership = action.payload;
        },

        setAcceptStatus(state, action) {
            state.acceptStatus = action.payload;
        },

        setFromLk(state, action) {
            state.fromLk = action.payload;
        }
    },
});

export const {
    setManagerId,
    setPartnershipId,
    setFromPartnership,
    setEmailPasport,
    setPartnerRates,
    setPartnerRate,
    setEmailState,
    setAcceptStatus,
    setFromLk
} = ManagersSlice.actions;

export default ManagersSlice.reducer;
