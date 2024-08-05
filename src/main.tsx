import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./pages/my-tasks/index.tsx";
import AllTasksPage from "./pages/all-tasks/index.tsx";
import MainLayout from "./components/layouts/main-layout.tsx";
import LoginPage from "./pages/login/index.tsx";

import { QueryClient, QueryClientProvider } from "react-query";

import "./index.css";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<MainPage />} />
            <Route path="/all-tasks" element={<AllTasksPage />} />
          </Route>
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);
