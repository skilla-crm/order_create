import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    tags: [],
    commentSupervisor: '',
    notes: '',
    minDuration: 1,
    duration: 1,
    service: 15,
};

const DetailsSlice = createSlice({
    name: 'DetailsSlice',
    initialState,

    reducers: {

        setService(state, action) {
            state.service = action.payload
        },

        setRequirements(state, action) {
            state.tags = action.payload
        },


        addRequirements(state, action) {
            state.tags = [...state.tags, action.payload]
        },

        deleteRequirements(state, action) {
            state.tags = [...state.tags].filter(el => el !== action.payload)
        },

        setMinDurqtion(state, action) {
            state.minDuration = action.payload
        },

        setDuration(state, action) {
            state.duration = action.payload
        },

        setCommentSupervisor(state, action) {
            state.commentSupervisor = action.payload
        },

        setNotes(state, action) {
            state.notes = action.payload
        },
    },
});

export const {
    setService,
    setRequirements,
    addRequirements,
    deleteRequirements,
    setCommentSupervisor,
    setNotes,
    setMinDurqtion,
    setDuration
} = DetailsSlice.actions;

export default DetailsSlice.reducer;
