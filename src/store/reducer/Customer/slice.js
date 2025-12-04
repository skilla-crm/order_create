import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    companies: [],
    customer: {},
    contract: {},
    payType: 1,
    name: '',
    phone: '',
    noContactPerson: false,
    isBlack: 0,
    isBlackOur: 0,
    blackCreatorPartnership: '',
    debt: 0,
    debtThreshold: 0,
    contacts: [],
    isSms: false
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

        setContract(state, action) {
            state.contract = action.payload;
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

        setIsBlackOur(state, action) {
            state.isBlackOur = action.payload;
        },

        setIsBlackCreatorPartnership(state, action) {
            state.blackCreatorPartnership = action.payload;
        },

        setDebt(state, action) {
            state.debt = action.payload;
        },

        setDebtThreshold(state, action) {
            state.debtThreshold = action.payload;
        },

        setContacts(state, action) {
            state.contacts = action.payload;
        },

        setNoContactPerson(state, action) {
            state.noContactPerson = action.payload;
        },

        setIsSms(state, action) {
            state.isSms = action.payload;
        },
    },
});

export const {
    setCompaniesList,
    setAddCompanies,
    setCustomer,
    setContract,
    setPayType,
    setName,
    setPhone,
    setIsBlack,
    setIsBlackOur,
    setIsBlackCreatorPartnership,
    setDebt,
    setDebtThreshold,
    setContacts,
    setNoContactPerson,
    setIsSms
} = CustomerSlice.actions;

export default CustomerSlice.reducer;
