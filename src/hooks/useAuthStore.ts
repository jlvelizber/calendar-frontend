import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { RootState, onChecking, onLogin, onLogout, onLogoutCalendar } from "../store";
import { UserInterface } from "../interfaces";
import { CalendarAPI } from "../api";
import { AxiosResponse } from "axios";

export const useAuthStore = () => {
  const { status, errorMessage, user } = useSelector(
    (state: RootState) => state.auth
  );

  const dispatch = useDispatch();

  const startLogin = async ({ email, password }: Partial<UserInterface>) => {
    dispatch(onChecking());
    try {
      const { data }: AxiosResponse<UserInterface> = await CalendarAPI.post(
        "/auth",
        {
          email,
          password,
        }
      );

      localStorage.setItem("token", data?.token as string);
      localStorage.setItem("token-init-time", new Date().getTime().toString());

      dispatch(onLogin(data));

      
    } catch (error) {
      dispatch(onLogout("Credenciales invalidas"));
      console.log(error);
    }
  };

  const startRegister = async ({
    email,
    password,
    name,
  }: Partial<UserInterface>) => {
    dispatch(onChecking());
    try {
      const { data }: AxiosResponse<UserInterface> = await CalendarAPI.post(
        "auth/new",
        {
          email,
          password,
          name,
        }
      );

      localStorage.setItem("token", data?.token as string);
      localStorage.setItem("token-init-time", new Date().getTime().toString());

      dispatch(onLogin(data));
    } catch (error: any) {
      console.log(error.response.data);
      dispatch(onLogout(error?.respose?.data?.message || ""));
    }
  };

  const checkAuthToken = async () => {
    const token: string | null = localStorage.getItem("token");
    if (!token) return dispatch(onLogout(""));

    try {
      const { data } = await CalendarAPI.post("auth/renew");
      localStorage.setItem("token", data.token);
      localStorage.setItem("token-init-time", new Date().getTime().toString());

      dispatch(onLogin(data));
    } catch (error) {
      localStorage.clear();
      return dispatch(onLogout(""));
    }
  };


  const startLogout = () => {
    localStorage.clear();
    dispatch(onLogout(''));
    dispatch(onLogoutCalendar());
  }

  return {
    status,
    errorMessage,
    user,
    startLogin,
    startRegister,
    checkAuthToken,
    startLogout
  };
};
