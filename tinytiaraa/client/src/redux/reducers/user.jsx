import { createReducer } from "@reduxjs/toolkit";
// import  isAuthenticated  from "../../../../backend/middleware/auth";

const initialState ={
    isAuthenticated:false
}


export const userReducer = createReducer(initialState,(builder)=>{
    builder.addCase("LoadUserRequest",(state)=>{
        state.loading= true


    })
    .addCase("LoadUserSuccess",(state,action)=>{
        state.isAuthenticated = true
        state.loading = false
        state.user = action.payload

    })
    
    .addCase('LoadUserFail', (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
    })

    .addCase('updateUserInfoRequest', (state) => {
        state.loading = true;
    })
    .addCase('updateUserInfoSuccess', (state,action) => {
        state.loading = false;
        state.user = action.payload

    })
    .addCase('updateUserInfoFailed', (state,action) => {
        state.loading = false;
        state.error = action.payload

    })

    //update user address

    .addCase('updateUserAddressRequest', (state) => {
        state.addressloading = true;
    })
    .addCase('updateUserAddressSuccess', (state,action) => {
        state.addressloading = false;
        state.successMessage= action.payload.successMessage
        state.user = action.payload.user

    })
    .addCase('updateUserAddressFailed', (state,action) => {
        state.addressloading = false;
        state.error = action.payload

    })
    //delete user address

    .addCase('deleteUserAddressRequest', (state) => {
        state.addressloading = true;
    })
    .addCase('deleteUserAddressSuccess', (state,action) => {
        state.addressloading = false;
        state.successMessage= action.payload.successMessage
        state.user = action.payload.user

    })
    .addCase('deleteUserAddressFailed', (state,action) => {
        state.addressloading = false;
        state.error = action.payload

    })





    .addCase('clearErrors', (state) => {
        state.error = null;
    });

    // update user information

    


})

