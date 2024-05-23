import {
  onCloseModal,
  onOpenDateModal,
  uiSlice,
} from "./../../../src/store/ui/uiSlice";

describe("Pruebas en UI Slice", () => {
  test("Debe regresar el estado por defecto", () => {
    expect(uiSlice.getInitialState()).toEqual({ isOPenDateModal: false });
  });

  test("Debe abrir y cerrar el estado del ui slice", () => {
    let state = uiSlice.getInitialState();

    state = uiSlice.reducer(state, onOpenDateModal());

    expect(state.isOPenDateModal).toBeTruthy();

    state = uiSlice.reducer(state, onCloseModal());
    expect(state.isOPenDateModal).toBeFalsy();
  });
});
