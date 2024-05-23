import calendarAPI from "../../src/api/calendarApi";

describe("Pruebas de calendar API", () => {
  test("Debe tener la configuración por defecto", () => {
    expect(calendarAPI.defaults.baseURL).toBe(process.env.VITE_API_URL);
  });

  test("Debe tener el x-token en todas las peticiones", async () => {
    const token = "ABC-123456";

    localStorage.setItem("token", token);

    const res = await calendarAPI.get("/auth");
    expect(res.config.headers["x-token"]).toBe(token);
  });
});
