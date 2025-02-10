import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    inn: '',
    kpp: '',
    name: '',
    ogrn: '',
    director: '',
    jobTitle: '',
    legalBasis: '',
    address: '',
    email: '',
    partyContract: '',
    billState: false,
    billSum: '',
    contractState: true,
};

const AddCustomerSlice = createSlice({
    name: 'AddCustomerSlice',
    initialState,

    reducers: {
        setInn(state, action) {
            state.inn = action.payload;
        },

        setKpp(state, action) {
            state.kpp = action.payload;
        },

        setName(state, action) {
            state.name = action.payload;
        },

        setOgrn(state, action) {
            state.ogrn = action.payload;
        },
        

        setDirector(state, action) {
            state.director = action.payload;
        },

        setJobTitle(state, action) {
            state.jobTitle = action.payload;
        },

        setLegalBasis(state, action) {
            state.legalBasis = action.payload;
        },

        setAddress(state, action) {
            state.address = action.payload;
        },

         setEmail(state, action) {
            state.email = action.payload;
        },

        setPartyContract(state, action) {
            state.partyContract = action.payload;
        },
        
        setBillState(state, action) {
            state.billState = action.payload;
        },

        setBillSum(state, action) {
            state.billSum = action.payload;
        },

        setContractState(state, action) {
            state.contractState = action.payload;
        },

    },
});

export const {
    setInn,
    setKpp,
    setName,
    setOgrn,
    setDirector,
    setJobTitle,
    setLegalBasis,
    setAddress,
    setEmail,
    setPartyContract,
    setBillState,
    setBillSum,
    setContractState
} = AddCustomerSlice.actions;

export default AddCustomerSlice.reducer;
