import { AuthInterface } from "./../../src/interfaces";

export const initialState: AuthInterface = {
  user: {
    email: "",
    name: "",
    password: "",
    token: "",
  },
  errorMessage: "",
  status: "checking",
};

export const authenticatedState: AuthInterface = {
  user: {
    email: "jorgeconsalvacion@gmail.com",
    name: "Jorge Luis",
    password: "123456",
    token: "",
  },
  errorMessage: "",
  status: "authenticated",
};

export const notAuthenticatedState: AuthInterface = {
  user: {
    email: "",
    name: "",
    password: "",
    token: "",
  },
  errorMessage: "",
  status: "not-authenticated",
};
