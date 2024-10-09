import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AppProvider } from "./context/index.tsx";
import { AppRoutes } from "./pages/AppRoutes.tsx";
import { MainLayout } from "./components/MainLayout/index.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppProvider>
      <BrowserRouter>
        <MainLayout>
          <AppRoutes />
        </MainLayout>
      </BrowserRouter>
    </AppProvider>
  </React.StrictMode>,
);
