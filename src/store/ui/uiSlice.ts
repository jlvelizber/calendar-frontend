import {createSlice} from '@reduxjs/toolkit';


export const uiSlice = createSlice({
    name: 'uiSlice',
    initialState: {
        isOPenDateModal : false,
    },
    reducers: {
        onOpenDateModal : (state) => {
            state.isOPenDateModal = true;
        },
        onCloseModal : (state) => { 
            state.isOPenDateModal = false;
        }
    }
})

export const {onOpenDateModal, onCloseModal} = uiSlice.actions