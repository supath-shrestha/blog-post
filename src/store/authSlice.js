import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userData: {
        name:'demo',
        email:'demo@gmail.com'
    },
    status: false,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setLogin: (state, action) => {
            state.status = true;
            state.userData = action.payload;
        },

        setLogout: (state) => {
            state.status = false;
            state.userData = null;
        },
    },
})

export const { setLogin, setLogout } = authSlice.actions;

export default authSlice.reducer