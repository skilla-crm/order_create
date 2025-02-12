import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    rate: '',
    rateWorker: ''
};

const RatesSlice = createSlice({
    name: 'RatesSlice',
    initialState,

    reducers: {
        setRate(state, action) {
            state.rate = action.payload;
        },

        setRateWorker(state, action) {
            state.rateWorker = action.payload;
        }
    },
});

export const {
    setRate,
    setRateWorker
} = RatesSlice.actions;

export default RatesSlice.reducer;
