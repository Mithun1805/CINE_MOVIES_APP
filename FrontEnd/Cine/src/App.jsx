
import React from "react";
import { Routes, Route } from "react-router-dom";
import Search from './components/search'
import Login from "./components/Login";
import Layout from "./components/Layout";
import Home from "./components/Home";
import History from "./components/History";
import MyList from "./components/Mylist";
import SignUp from './components/SignUp'
import Profile from "./components/Profile";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>

      {/* Login */}
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<SignUp/>}/>

      {/* Navbar stays fixed */}
      <Route element={<Layout />}>

        <Route path="/home" element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } />

        <Route path="/history" element={<ProtectedRoute><History /></ProtectedRoute>} />

        <Route path="/mylist" element={<ProtectedRoute><MyList /></ProtectedRoute>} />

        <Route path="/search" element={<ProtectedRoute><Search /></ProtectedRoute>} />

        <Route
    path="/profile"
    element={
        <ProtectedRoute>
            <Profile />
        </ProtectedRoute>
    }
/>

        

      </Route>

    </Routes>
  );
}

export default App;

