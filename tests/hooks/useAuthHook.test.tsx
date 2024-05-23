import React from "react";

import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { AuthSlice } from "../../src/store";
import { renderHook } from "@testing-library/react";
import { useAuthStore } from "../../src/hooks/useAuthStore";

const getMockStore = (initialState) => {
  return configureStore({
    reducer: {
      ui: AuthSlice.reducer,
    },
    preloadedState: { ...initialState },
  });
};

describe("Pruebas con useAuthStore", () => {
  test.skip("useAuthStore debe regresar los valores por defecto", () => {
    const initialState = {
      user: {
        email: "",
        name: "",
        password: "",
        token: "",
      },
      errorMessage: "",
      status: "checking",
    };

    const mockStore = getMockStore(initialState);

    

    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}> {children} </Provider>
      ),
    });


    // expect(result.current).toEqual({
    //   status: ,
    //   errorMessage,
    //   user,
    //   startLogin,
    //   startRegister,
    //   checkAuthToken,
    //   startLogout
    // });

    // expect(result.current).toEqual(initialState);
  });



  // test('startLogin debe realizar el login correctamente', () => {});
});
