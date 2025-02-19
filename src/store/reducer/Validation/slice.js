import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    companyError: false,
    phoneError: false,
    phoneErrorFormat: false,
    nameError: false,
    timeError: false,
    adressError: false,
    rateError: false,
    rateWorkerError: false,
    paySummError: false,
    partnerError: false,
    emailError: false,
    emailErrorFormat: false,
    isBlackError: false,
    isDebtError: false
};

const ValidtionSlice = createSlice({
    name: 'ValidtionSlice',
    initialState,

    reducers: {
        setСompanyError(state, action) {
            state.companyError = action.payload;
        },

        setPhoneError(state, action) {
            state.phoneError = action.payload;
        },

        setPhoneErrorFormat(state, action) {
            state.phoneErrorFormat = action.payload;
        },

        setNameError(state, action) {
            state.nameError = action.payload;
        },

        setTimeError(state, action) {
            state.timeError = action.payload;
        },

        setAdressError(state, action) {
            state.adressError = action.payload;
        },

        setRateError(state, action) {
            state.rateError = action.payload;
        },

        setRateWorkerError(state, action) {
            state.rateWorkerError = action.payload;
        },

        setPaySummError(state, action) {
            state.paySummError = action.payload;
        },

        setPartnerError(state, action) {
            state.partnerError = action.payload;
        },

        setEmailError(state, action) {
            state.emailError = action.payload;
        },

        setEmailErrorFormat(state, action) {
            state.emailErrorFormat = action.payload;
        },

        setIsBlackError(state, action) {
            state.isBlackError = action.payload;
        },

        setIsDebtError(state, action) {
            state.isDebtError = action.payload;
        },
    },
});

export const {
    setСompanyError,
    setPhoneError,
    setPhoneErrorFormat,
    setNameError,
    setTimeError,
    setAdressError,
    setRateError,
    setRateWorkerError,
    setPartnerError,
    setEmailError,
    setEmailErrorFormat,
    setIsBlackError,
    setIsDebtError,
    setPaySummError
} = ValidtionSlice.actions;

export default ValidtionSlice.reducer;
