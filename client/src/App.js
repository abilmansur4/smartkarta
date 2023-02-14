import "./App.css";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { PrettyForm } from "./components/PrettyForm";
import { MenuComponent } from "./components/MenuComponent";
import { Container } from "@chakra-ui/react";
import { LoginPage } from "./components/LoginPage";
import { HomePage } from "./components/HomePage";
import { AuthProvider } from "./hoc/AuthProvider";
import { UsersList } from "./components/UsersList";
import { Layout } from "./components/Layout";
import { RequireAuth } from "./hoc/RequireAuth";
import { useAuth } from "./hook/useAuth";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="social"
            element={
              <RequireAuth>
                <PrettyForm />
              </RequireAuth>
            }
          />
          <Route
            path="cards"
            element={
              <RequireAuth>
                <UsersList />
              </RequireAuth>
            }
          />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
