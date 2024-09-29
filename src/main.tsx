import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AsideNav } from "./components/AsideNav/index.tsx";
import { AppProvider } from "./context/AppProvider.tsx";
import { AppRoutes } from "./AppRoutes.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppProvider>
      <BrowserRouter>
        <AsideNav />
        <AppRoutes />
      </BrowserRouter>
    </AppProvider>
  </React.StrictMode>,
);
