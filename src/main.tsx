import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App/App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { store } from "./store/store.ts";
import MainPage from "./pages/MainPage/MainPage.tsx";
import RegisterPage from "./pages/RegisterPage/registerPage.tsx";
import LoginPage from "./pages/LoginPage/loginPage.tsx";
import ProfilePage from "./pages/ProfilePage/profilePage.tsx";
import TripPage from "./pages/TripPage/TripPage.tsx";
import MyTripsPage from "./pages/MyTripsPage/MyTripsPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <MainPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/profile",
        element: <ProfilePage />,
      },
      {
        path: "/trip/:id",
        element: <TripPage />,
      },
      {
        path: "/my/trips",
        element: <MyTripsPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <RouterProvider router={router} />,
    <ToastContainer position="bottom-left" autoClose={2000} />,
  </Provider>
);
