import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name : 'user',
    initialState : {
        currentUser : null,
        error : null,
        loading : false

    },
    reducers : {
        logInStart: (state,action) => {
            state.error = null;
            state.loading = true;
        },

        logInSuccess : (state,action) => {
            state.currentUser = action.payload;
            state.error = null;
            state.loading = false;
        },

        logInFailure : (state,action)=>{
            state.loading = true;
            state.error = action.payload;
        }

    }
    
})

export const {logInFailure,logInSuccess,logInStart} = userSlice.actions;    

export default userSlice.reducer;