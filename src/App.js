import React from "react";
import "./App.css";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Login from "./pages/Login";
import SignUp from "./pages/Signup";
import Cars from "./pages/Cars";
import Categories from "./pages/Categories";
import AddUpdateCategory from "./pages/AddUpdateCategory";
import AddUpdateCar from "./pages/AddUpdateCar";
import NotFoundPage from "./pages/NotFound";
import { logout } from "./redux/actions/auth";

function App() {
  const dispatch = useDispatch();
  const navigation = useNavigate();

  const auth = useSelector((state) => state.auth);

  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container d-flex justify-content-end">
          <ul className="navbar-nav ml-auto flex-row">
            {auth?.user && (
              <>
                <li className="nav-item" style={{ marginRight: 20 }}>
                  <Link className="nav-link" to={"/cars"}>
                    Cars
                  </Link>
                </li>
                <li className="nav-item" style={{ marginRight: 20 }}>
                  <Link className="nav-link" to={"/categories"}>
                    Categories
                  </Link>
                </li>
              </>
            )}
            <li className="nav-item">
              <Link
                className="nav-link"
                style={{ marginRight: 20 }}
                to={"/sign-up"}
              >
                Sign up
              </Link>
            </li>
            <li className="nav-item">
              {!auth?.user ? (
                <Link className="nav-link" to={"/sign-in"}>
                  Login
                </Link>
              ) : (
                <div
                  className="nav-link"
                  style={{ cursor: "pointer" }}
                  onClick={() => dispatch(logout(navigation))}
                >
                  Logout
                </div>
              )}
            </li>
          </ul>
        </div>
      </nav>
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
