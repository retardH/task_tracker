import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./pages/my-tasks/index.tsx";
import AllTasksPage from "./pages/all-tasks/index.tsx";
import MainLayout from "./components/layouts/main-layout.tsx";
import LoginPage from "./pages/login/index.tsx";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./index.css";
import ProtectedRoute from "./components/layouts/protected-route.tsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <MainLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<MainPage />} />
            <Route path="/all-tasks" element={<AllTasksPage />} />
          </Route>
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>,
);
