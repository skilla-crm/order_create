import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    address: {},
    metro: [],
    defaultCordinate: [59.9342802, 30.3350986],
    noAddress: false,
    addressForReturn: '',
    dopAdresses: []
};

const AddressSlice = createSlice({
    name: 'AddressSlice',
    initialState,

    reducers: {

        setAddress(state, action) {
            state.address = action.payload
        },

        setMetro(state, action) {
            if (action.payload) {
                state.metro = [...state.metro, action.payload]
            } else {
                state.metro = []
            }
        },

        deleteMetro(state) {
            state.metro = []
        },

        setDefaultCordinate(state, action) {
            state.defaultCordinate = action.payload
        },

        setNoAddress(state, action) {
            state.noAddress = action.payload
        },

        setAddressForReturn(state, action) {
            state.addressForReturn = action.payload
        },

        setDopAdresses(state, action) {
            state.dopAdresses = action.payload
        },

        addDopAdresses(state, action) {

            const { id } = action.payload;
            const index = state.dopAdresses.findIndex(el => el.id === id);
            if (index !== -1) {
                state.dopAdresses.splice(index, 1, action.payload);
            } else {
                state.dopAdresses = [...state.dopAdresses, action.payload]
            }
        },

        deleteDopAddress(state, action) {
            state.dopAdresses = [...state.dopAdresses].filter(el => el.id !== action.payload)
        },

        addDopAdressesMetro(state, action) {
            const { id, ...metro } = action.payload;
            const index = state.dopAdresses.findIndex(el => el.id === id);
            const adress = [...state.dopAdresses].find(el => el.id === id);
            state.dopAdresses.splice(index, 1, { ...adress, ...metro });
        },



    },
});

export const {
    setAddress,
    deleteMetro,
    setMetro,
    setDopMetro,
    setDefaultCordinate,
    setNoAddress,
    setAddressForReturn,
    setDopAdresses,
    addDopAdresses,
    deleteDopAddress,
    addDopAdressesMetro
} = AddressSlice.actions;

export default AddressSlice.reducer;
