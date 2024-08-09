import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./pages/my-tasks/index.tsx";
import AllTasksPage from "./pages/all-tasks/index.tsx";
import MainLayout from "./components/layouts/main-layout.tsx";
import LoginPage from "./pages/login/index.tsx";

import {
  MutationCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import toast, { Toaster } from "react-hot-toast";

import "./index.css";
import ProtectedRoute from "./components/layouts/protected-route.tsx";
import SetupPage from "./pages/setup/index.tsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
  mutationCache: new MutationCache({
    onSuccess: (data: any) => {
      toast.success(data?.message || "Success");
    },
  }),
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
            <Route path="/setup" element={<SetupPage />} />
          </Route>
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
      <Toaster position="top-center" />
    </QueryClientProvider>
  </React.StrictMode>,
);
