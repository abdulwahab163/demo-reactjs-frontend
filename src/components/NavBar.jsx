import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { logout } from "../redux/actions/auth";
import CustomNavLink from "./CustomNavLink";

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
              <li className="nav-item">
                <CustomNavLink to="/cars" title="Cars" />
              </li>
              <li className="nav-item">
                <CustomNavLink to="/categories" title="Categories" />
              </li>
            </>
          )}
          <li className="nav-item">
            <CustomNavLink to="/sign-up" title="Sign up" />
          </li>
          <li className="nav-item">
            {!auth?.user ? (
              <CustomNavLink to="/sign-in" title="Login" />
            ) : (
              <div
                className="nav-link ms-1"
                style={{
                  cursor: "pointer",
                  color: "black",
                  fontWeight: 500,
                  fontFamily: "Fira Sans",
                }}
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
