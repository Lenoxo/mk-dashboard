import { Home } from "./home";
import { useRoutes } from "react-router-dom";
import { ProfilePage } from "./profile";
import { UpdateProfileForm } from "../components/UpdateProfileForm";
import { RivalForm } from "../components/RivalForm";
import { HistoryPage } from "./history";
import { Calculator } from "../components/Calculator";

export function AppRoutes() {
  const routes = useRoutes([
    {
      // TODO: Añadir una página de error personalizada con la propiedad de errorPage.
      path: "/",
      element: <Home />
    },
    {
      path: "/profile",
      element: <ProfilePage />
    },
    {
      path: "/profile/update",
      element: <UpdateProfileForm />
    },
    {
      path: "/profile/rivals/:id",
      // I left null because I'm not using this form inside a Modal
      element: <RivalForm setOpenModal={null} />
    },
    {
      path: "/history",
      element: <HistoryPage />
    },
    {
      path: "/tests",
      element: <Calculator />
    }
  ]);
  return routes;
}
