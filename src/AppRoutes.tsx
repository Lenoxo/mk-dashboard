import React from "react";
import App from "./App.tsx";
import { useRoutes } from "react-router-dom";
import { ProfilePage } from "./pages/profile.tsx";

export function AppRoutes() {
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
