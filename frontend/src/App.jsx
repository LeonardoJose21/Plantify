import React, { useEffect, useState } from "react"
import {
  BrowserRouter, Routes, Route
} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import './index.css';
import Header from "./components/Header";
import { ACCESS_TOKEN } from "./constants";
import LandingPage from "./pages/landing";



const LogOut = () => {
  localStorage.clear()
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
              <Home />
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