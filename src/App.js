import React from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";

import Login from "./pages/Login";
import SignUp from "./pages/Signup";
import Cars from "./pages/Cars";
import Categories from "./pages/Categories";
import AddUpdateCategory from "./pages/AddUpdateCategory";
import AddUpdateCar from "./pages/AddUpdateCar";
import NotFoundPage from "./pages/NotFound";
import NavBar from "./components/NavBar";

import "./App.css";

function App() {
  const auth = useSelector((state) => state.auth);

  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/sign-in" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Routes>
      {/*  Protected Routes*/}

      {auth?.user && (
        <Routes>
          <Route path="/cars" element={<Cars />} />
          <Route path="/add-update-car" element={<AddUpdateCar />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/add-update-category" element={<AddUpdateCategory />} />
        </Routes>
      )}

      {/* 404 Route*/}
      {/* <Routes>
        <Route path="*" element={<NotFoundPage />} />
      </Routes> */}
    </div>
  );
}

export default App;
