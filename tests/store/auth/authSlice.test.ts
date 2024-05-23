import { initialState, authenticatedState } from "../../fixtures/AuthState";
import { UserStateCredentials } from "../../fixtures/UserState";
import {
  AuthSlice,
  onClearErrorMessage,
  onLogin,
  onLogout,
} from "./../../../src/store/auth/AuthSlice";

describe("Pruebas con AuthSlice", () => {
  test("debe ingresar el estado inicial", () => {
    expect(AuthSlice.getInitialState()).toEqual(initialState);
  });

  test("debe probar un login", () => {
    const state = AuthSlice.reducer(
      initialState,
      onLogin(UserStateCredentials)
    );

    expect(state).toEqual({
      status: "authenticated",
      user: UserStateCredentials,
      errorMessage: undefined,
    });
  });

  test("debe realizar un logout", () => {
    const state = AuthSlice.reducer(authenticatedState, onLogout(""));
    expect(state).toEqual({
      status: "not-authenticated",
      user: { ...initialState.user },
      errorMessage: "",
    });
  });


  test("debe limpiar el mensaje de error", () => {
    const errorMessage = "Credenciales no validas"
    const state = AuthSlice.reducer(authenticatedState, onLogout(errorMessage));

    const newState= AuthSlice.reducer(state, onClearErrorMessage())


    expect(newState.errorMessage).toEqual("")


  })
});
