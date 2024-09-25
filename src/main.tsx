import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import {
  BrowserRouter,
  createBrowserRouter,
  RouterProvider,
  useRoutes,
} from "react-router-dom";
import { ProfilePage } from "./pages/profile.tsx";
import { AsideNav } from "./components/AsideNav/index.tsx";

function AppRoutes() {
  const routes = useRoutes([
    {
      // TODO: Añadir una página de error personalizada con la propiedad de errorPage.
      path: "/",
      element: <App />,
    },
    {
      path: "/profile",
      element: <ProfilePage />,
    },
  ]);
  return routes;
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AsideNav />
      <AppRoutes />
    </BrowserRouter>
  </React.StrictMode>,
);
