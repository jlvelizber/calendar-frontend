import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AuthInterface, UserInterface } from "../../interfaces";

const initialState: AuthInterface = {
  user: {
    email: "",
    name: "",
    password: "",
    token: "",
  },
  errorMessage: "",
  status: "checking",
};

export const AuthSlice = createSlice({
  name: "authSilce",
  initialState,
  reducers: {
    onChecking: (state: AuthInterface) => {
      (state.status = "checking"),
        (state.user = initialState.user),
        (state.errorMessage = undefined);
    },
    onLogin: (
      state: AuthInterface,
      { payload }: PayloadAction<UserInterface>
    ) => {
      state.status = "authenticated";
      state.user = payload;
      state.errorMessage = undefined;
    },
    onLogout: (state: AuthInterface, { payload }: PayloadAction<string>) => {
      state.status = "not-authenticated";
      state.errorMessage = payload;
      state.user = {
        email: "",
        name: "",
        password: "",
        token: "",
      };
    },

    onClearErrorMessage: (state: AuthInterface) => {
      state.errorMessage = "";
    },
  },
});

export const { onChecking, onLogin, onLogout, onClearErrorMessage } = AuthSlice.actions;
