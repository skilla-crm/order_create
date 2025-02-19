import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    rate: '',
    rateWorker: '',
    orderSum: ''
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
        },

        setOrderSum(state, action) {
            state.orderSum = action.payload;
        }
    },
});

export const {
    setRate,
    setRateWorker,
    setOrderSum
} = RatesSlice.actions;

export default RatesSlice.reducer;
