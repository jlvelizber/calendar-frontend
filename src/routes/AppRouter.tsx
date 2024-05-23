import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { LoginPage } from "../auth";
import { CalendarPage } from "../calendar";
import { useAuthStore } from "../hooks/useAuthStore";

export const AppRouter = () => {
  // const authStatus = 'not-authenticated';

  const { status, checkAuthToken } = useAuthStore();

  useEffect(() => {
    checkAuthToken();
  }, []);

  if (status === "checking") {
    return <h1>Cargando...</h1>;
  }

  return (
    <Routes>
      {status === "not-authenticated" ? (
        <>
          <Route path="/auth/*" element={<LoginPage />} />
          <Route path="/*" element={<Navigate to="/auth/login" />} />
        </>
      ) : (
        <>
          <Route path="/" element={<CalendarPage />} />
          <Route path="/*" element={<Navigate to="/" />} />
        </>
      )}
    </Routes>
  );
};
