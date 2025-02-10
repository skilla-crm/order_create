import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    companies: [],
    customer: {},
    payType: 1,
    name: '',
    phone: '',
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
    },
});

export const {
    setCompaniesList,
    setAddCompanies,
    setCustomer,
    setPayType,
    setName,
    setPhone
} = CustomerSlice.actions;

export default CustomerSlice.reducer;
