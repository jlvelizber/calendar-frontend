import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./routes";
import "./style.css";
import { Provider } from "react-redux";
import { store } from "./store";

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </Provider>
  );
}
