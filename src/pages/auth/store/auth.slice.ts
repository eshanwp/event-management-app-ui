import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import LoginResponseModel from "../models/response/login-response.model.ts";

export interface HomeSliceModel {
     auth: LoginResponseModel | null;
}

const initialState = {
     auth: null,
} as HomeSliceModel;

const authSlice = createSlice({
     name: "authSlice",
     initialState: initialState,
     reducers: {
          setAuth: (state: any, action: PayloadAction<LoginResponseModel | null>) => {
               state.auth = action.payload;
          },
     },
});

export default authSlice;
export const authActions = authSlice.actions;
