import App from "./App.tsx";
import { useRoutes } from "react-router-dom";
import { ProfilePage } from "./pages/profile.tsx";
import { RivalForm } from "./components/RivalForm/index.tsx";

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
    {
      path: "/profile/rivals/:id",
      // I left null because I'm not using this form inside a Modal
      element: <RivalForm setOpenModal={null} />,
    },
  ]);
  return routes;
}
