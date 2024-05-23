import React from "react";

import { act, renderHook } from "@testing-library/react";
import { useUiHooks } from "../../src/hooks/useUiHook";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { uiSlice } from "../../src/store";

const getMockStore = (initialState) => {
  return configureStore({
    reducer: {
      ui: uiSlice.reducer,
    },
    preloadedState: { ...initialState },
  });
};

describe("Pruebas en uiStore", () => {
  test("debe regresar los valores por defecto", () => {
    const mockStore = getMockStore({ isOPenDateModal: false });

    const { result } = renderHook(() => useUiHooks(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}> {children} </Provider>
      ),
    });

    expect(result.current).toEqual({
      isOPenDateModal: false,
      openDateModal: expect.any(Function),
      closeDateModal: expect.any(Function),
    });
  });

  test("Is modal open", () => {
    const mockStore = getMockStore({ isOPenDateModal: false });
    const { result } = renderHook(() => useUiHooks(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}> {children} </Provider>
      ),
    });

    const { openDateModal } = result.current;

    act(() => openDateModal());

    expect(result.current.isOPenDateModal).toBeTruthy();
  });

  test("Is modal close", () => {
    const mockStore = getMockStore({ isOPenDateModal: false });
    const { result } = renderHook(() => useUiHooks(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}> {children} </Provider>
      ),
    });

    const { closeDateModal } = result.current;

    act(() => closeDateModal());

    expect(result.current.isOPenDateModal).toBeFalsy();
  });
});
