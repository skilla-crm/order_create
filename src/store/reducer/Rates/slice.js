import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    rate: '',
    rateWorker: '',
    orderSum: '',
    unit: 1,
    unitWorker: 1,
    sameTarification: true,
    ratesPartnership: [],
    tariffId: '',
    contractTariffId: '',
    expectedAmount: '',
    expectedAmountWorker: '',
    expectedAmountAll: '',
    expectedAmountWorkerAll: '',
    minAmount: '',
    minAmountWorker: '',
    minSum: '',
    minSumWorker: ''

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

        setSameTarification(state, action) {
            state.sameTarification = action.payload;
        },

        setRatesPartnership(state, action) {
            state.ratesPartnership = action.payload;
        },

        setTariffId(state, action) {
            state.tariffId = action.payload;
        },

        setContractTariffId(state, action) {
            state.contractTariffId = action.payload;
        },

        setExpectedAmount(state, action) {
            state.expectedAmount = action.payload;
        },

        setExpectedAmountWorker(state, action) {
            state.expectedAmountWorker = action.payload;
        },

        setExpectedAmountAll(state, action) {
            state.expectedAmountAll = action.payload;
        },

        setExpectedAmountWorkerAll(state, action) {
            state.expectedAmountWorkerAll = action.payload;
        },

        setMinAmount(state, action) {
            state.minAmount = action.payload;
        },

        setMinAmountWorker(state, action) {
            state.minAmountWorker = action.payload;
        },

        setMinSum(state, action) {
            state.minSum = action.payload;
        },

        setMinSumWorker(state, action) {
            state.minSumWorker = action.payload;
        },
    },
});

export const {
    setRate,
    setRateWorker,
    setOrderSum,
    setUnit,
    setUnitWorker,
    setSameTarification,
    setRatesPartnership,
    setTariffId,
    setContractTariffId,

    setExpectedAmount,
    setExpectedAmountWorker,
    setExpectedAmountAll,
    setExpectedAmountWorkerAll,

    setMinAmount,
    setMinAmountWorker,
    setMinSum,
    setMinSumWorker
} = RatesSlice.actions;

export default RatesSlice.reducer;
