import { Routes, Route } from "react-router-dom";

import MainLayout from "./layout/MainLayout";

import Home from "./components/Home";
import Login from "./components/Login";
import Admin from "./components/Admin";
import RegisterUser from "./components/RegisterUser";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";

export default function App() {
  return (
    <Routes>
     
      <Route
        path="/login"
        element={
          <MainLayout>
            <Login />
          </MainLayout>
        }
      />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <MainLayout>
              <Home />
            </MainLayout>
          </ProtectedRoute>
        }
      />


      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <MainLayout>
              <Admin />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/register"
        element={
          <AdminRoute>
            <MainLayout>
              <RegisterUser />
            </MainLayout>
          </AdminRoute>
        }
      />
    </Routes>
  );
}
