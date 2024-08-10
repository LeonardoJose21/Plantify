import React, { useEffect, useState } from "react"
import {
  BrowserRouter, Routes, Route, Navigate
} from "react-router-dom";
import axios from "axios";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import './index.css';
import Header from "./components/Header";
import { ProblemProvider } from "./ProblemContext";
import { ACCESS_TOKEN } from "./constants";
import LandingPage from "./pages/landing";



const LogOut = () => {
  localStorage.clear()
  return <Navigate to="/login" />
}

function RegisterAndLogout() {
  localStorage.clear()
  return <Register />
}

function App() {
  const [userIsLoggedIn, setUserIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token) {
      setUserIsLoggedIn(true);
    }

  }, []);

  return (
    <BrowserRouter>
      <Header userIsLoggedIn={userIsLoggedIn} onLogout={LogOut} />
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <ProblemProvider>
                <Home />
              </ProblemProvider>
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/register" element={<RegisterAndLogout />} />
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App