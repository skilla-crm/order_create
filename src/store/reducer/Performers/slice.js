import { createSlice } from '@reduxjs/toolkit';
import dayjs from 'dayjs';
import 'dayjs/locale/ru'

const initialState = {
    performersNum: 1,
    date: dayjs().locale('ru'),
    time: null,
    timerDisabled: false
};

const PerformersSlice = createSlice({
    name: 'PerformersSlice',
    initialState,

    reducers: {
        setPerformersNum(state, action) {
            state.performersNum = Number(action.payload);
        },

        setDate(state, action) {
            state.date = action.payload;
        },

        setTime(state, action) {
            state.time = action.payload;
        },

        setTimerDisabled(state, action) {
            state.timerDisabled = action.payload;
        },
    },
});

export const {
    setPerformersNum,
    setDate,
    setTime,
    setTimerDisabled
} = PerformersSlice.actions;

export default PerformersSlice.reducer;
