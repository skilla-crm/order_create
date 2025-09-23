import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    unitList: []
};

const ParametrsSlice = createSlice({
    name: 'ParametrsSlice',
    initialState,

    reducers: {
        setUnitList(state, action) {
            state.unitList = action.payload;
        },
    },
});

export const {
    setUnitList
} = ParametrsSlice.actions;

export default ParametrsSlice.reducer;
