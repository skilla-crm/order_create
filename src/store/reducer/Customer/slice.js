import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    companies: [],
    customer: {},
    payType: 1,
    name: '',
    phone: '',
    isBlack: 0,
    debt: 0,
    debtThreshold: 0
};

const CustomerSlice = createSlice({
    name: 'CustomerSlice',
    initialState,

    reducers: {
        setCompaniesList(state, action) {
            state.companies = action.payload;
        },

        setAddCompanies(state, action) {
            state.companies = [action.payload, ...state.companies];
        },

        setCustomer(state, action) {
            state.customer = action.payload;
        },

        setPayType(state, action) {
            state.payType = action.payload;
        },

        setName(state, action) {
            state.name = action.payload;
        },

        setPhone(state, action) {
            state.phone = action.payload;
        },

        setIsBlack(state, action) {
            state.isBlack = action.payload;
        },

        setDebt(state, action) {
            state.debt = action.payload;
        },

        setDebtThreshold(state, action) {
            state.debtThreshold = action.payload;
        },
    },
});

export const {
    setCompaniesList,
    setAddCompanies,
    setCustomer,
    setPayType,
    setName,
    setPhone,
    setIsBlack,
    setDebt,
    setDebtThreshold
} = CustomerSlice.actions;

export default CustomerSlice.reducer;
