import React from "react";
import { useFormik } from "formik";
import { CircularProgress } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

import { signInValidationSchema } from "../utils/validationSchemas";
import { getFormikError } from "../utils/helperFunctions";
import { login, resetLoginData } from "../redux/actions/auth";

const Login = () => {

  const navigation = useNavigate();
  const dispatch = useDispatch()
  
  const auth = useSelector((state) => state.auth);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: signInValidationSchema,
    onSubmit: (values) => {
      handleSignIn(values);
    },
  });

  const handleFocus = () => {
    dispatch(resetLoginData());
  };

  const handleSignIn = (values) => {
    dispatch(login(values,navigation));
  };
  return (
    <div className="auth-wrapper">
      <div className="auth-inner">
        {auth.error && (
          <div className="fade alert alert-danger show">{auth.error}</div>
        )}
        <form>
          <h3>Sign In</h3>
          <div className="mb-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              name="email"
              value={formik.values["email"]}
              onChange={formik.handleChange}
              onFocus={() => handleFocus()}
              style={{
                border:
                  formik.touched["email"] && formik.errors["email"]
                    ? "2px solid #FF6565"
                    : null,
              }}
            />

            {getFormikError(formik, "email")}
          </div>

          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              name="password"
              value={formik.values["password"]}
              onChange={formik.handleChange}
              onFocus={() => handleFocus()}
              style={{
                border:
                  formik.touched["password"] && formik.errors["password"]
                    ? "2px solid #FF6565"
                    : null,
              }}
            />

            {getFormikError(formik, "password")}
          </div>

          <div className="d-grid">
            <button
              type="submit"
              onClick={formik.handleSubmit}
              className="btn btn-primary"
            >
            {!auth.loading ? (
                "Login"
              ) : (
                <CircularProgress style={{ height: 20, width: 20 }} />
              )}
            </button>
          </div>
          <p className="forgot-password text-right">
            Not registered yet <Link to="/sign-up">sign up?</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
