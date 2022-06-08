import React from "react";
import { useFormik } from "formik";
import { CircularProgress } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

import { signUpValidationSchema } from "../utils/validationSchemas";
import { getFormikError } from "../utils/helperFunctions";
import { resetSignUpData, signUp } from "../redux/actions/auth";

const SignUp = () => {
  const dispatch = useDispatch();
  const navigation = useNavigate();

  const auth = useSelector((state) => state.auth);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
    },
    validationSchema: signUpValidationSchema,
    onSubmit: (values) => {
      handleSignUp(values);
    },
  });

  const handleSignUp = (values) => {
    dispatch(signUp(values, navigation));
  };

  const handleFocus = () => {
    dispatch(resetSignUpData());
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-inner">
        {auth.error && (
          <div className="fade alert alert-danger show">{auth.error}</div>
        )}
        <form>
          <h3>Sign Up</h3>

          <div className="mb-3">
            <label>Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Name"
              name="name"
              value={formik.values["name"]}
              onChange={formik.handleChange}
              onFocus={() => handleFocus()}
              style={{
                border:
                  formik.touched["name"] && formik.errors["name"]
                    ? "2px solid #FF6565"
                    : null,
              }}
            />

            {getFormikError(formik, "name")}
          </div>

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

          <div className="d-grid">
            <button
              type="submit"
              onClick={formik.handleSubmit}
              className="btn btn-primary"
            >
              {!auth.loading ? (
                "Sign Up"
              ) : (
                <CircularProgress style={{ height: 20, width: 20 }} />
              )}
            </button>
          </div>
          <p className="forgot-password text-right">
            Already registered <Link to="/sign-in">sign in?</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
