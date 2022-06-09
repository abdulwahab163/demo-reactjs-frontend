import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { logout } from "../redux/actions/auth";

const NavBar = () => {
  const dispatch = useDispatch();
  const navigation = useNavigate();

  const auth = useSelector((state) => state.auth);

  return (
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
  );
};

export default NavBar;
