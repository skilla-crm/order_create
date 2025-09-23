import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    rate: '',
    rateWorker: '',
    orderSum: '',
    unit: 1,
    unitWorker: 1
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
        },

         setUnit(state, action) {
            state.unit = action.payload;
        },

         setUnitWorker(state, action) {
            state.unitWorker = action.payload;
        },
    },
});

export const {
    setRate,
    setRateWorker,
    setOrderSum,
    setUnit,
    setUnitWorker
} = RatesSlice.actions;

export default RatesSlice.reducer;
