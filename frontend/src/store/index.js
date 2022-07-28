import { configureStore, createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: { isLoggedIn: false,isSignUp:false },
    reducers: {
        login(state) {
            state.isLoggedIn = true;
        },
        logout(state) {
            localStorage.removeItem("userId")
            state.isLoggedIn = false;
        },
        signUp(state) {
            state.isSignUp = true;
        },
    },
});

export const authActions = authSlice.actions

export const store = configureStore({
    reducer: authSlice.reducer
})
