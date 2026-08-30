
import React from "react";
import { Routes, Route } from "react-router-dom";
import Search from './components/search'
import Login from "./components/Login";
import Layout from "./components/Layout";
import Home from "./components/Home";
import History from "./components/History";
import MyList from "./components/Mylist";
import SignUp from './components/SignUp'

function App() {
  return (
    <Routes>

      {/* Login */}
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<SignUp/>}/>

      {/* Navbar stays fixed */}
      <Route element={<Layout />}>

        <Route path="/home" element={<Home />} />

        <Route path="/history" element={<History />} />

        <Route path="/mylist" element={<MyList />} />

        <Route path="/search" element={<Search/>}/>

        

      </Route>

    </Routes>
  );
}

export default App;

