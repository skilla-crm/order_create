import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    address: {},
    metro: [],
    defaultCordinate: [59.9342802, 30.3350986],
    noAddress: false

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



        /*  setAdditionalDates(state, action) {
             state.additionalDates = action.payload.sort((a, b) => new Date(a.date) - new Date(b.date));
             state.disabledDates = action.payload.map((el) => dayjs(el.date))
         },
 
         deleteAdditionalDates(state, action) {
             state.additionalDates = [...state.additionalDates.filter(el => el.id !== action.payload)];
             state.disabledDates = state.additionalDates.map((el) => dayjs(el.date))
         },
 
         editAdditionalDates(state, action) {
             state.additionalDates = state.additionalDates.map(item => item.id == action.payload.id
                 ? {
                     ...item,
                     date: action.payload.date,
                     time: action.payload.time,
                     performers: Number(action.payload.performers)
                 }
                 :
                 item
             )
             state.disabledDates = state.additionalDates.map((el) => dayjs(el.date))
                state.additionalDates.sort((a, b) => new Date(a.date) - new Date(b.date))
         }, */
    },
});

export const {
    setAddress,
    deleteMetro,
    setMetro,
    setDefaultCordinate, 
    setNoAddress
} = AddressSlice.actions;

export default AddressSlice.reducer;
