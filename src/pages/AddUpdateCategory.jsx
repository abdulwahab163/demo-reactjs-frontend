import React, { useState, useEffect } from "react";
import { CircularProgress } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { Button} from "reactstrap";
import { useNavigate, useLocation } from "react-router-dom";
import { useFormik } from "formik";

import { categoryValidationSchema } from "../utils/validationSchemas";
import InputField from "../components/InputField";
import {
  addCategory,
  resetCategoryErrors,
  updateCategory,
} from "../redux/actions/categories";

const AddUpdateCategory = (props) => {
  const location = useLocation();
  const dispatch = useDispatch();

  const navigation = useNavigate();

  const { loading, error } = useSelector(({ categories }) => categories);

  const [pageType, setPageType] = useState("add");

  useEffect(() => {
    const { state } = location;
    if (state?.category) {
      setPageType("edit");
      formik.setValues({ name: state.category.name });
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: categoryValidationSchema,
    onSubmit: (values) => {
      handleAddCategory(values);
    },
  });

  const handleAddCategory = (values) => {
    if (pageType === "edit") {
      dispatch(updateCategory(location.state.category._id, values, navigation));
    } else {
      dispatch(addCategory(values, navigation));
    }
  };

  if (loading) {
    return <CircularProgress style={{ height: "50px", width: "50px" }} />;
  }

  return (
    <div>
      <div className="p-4 d-flex justify-content-center">
        <div className="form-styles">
          <h2 className="form-heading d-flex">
            {pageType === "add" ? "Create New " : "Edit "} Category
          </h2>

          <form>
            {error && (
              <div className="fade alert alert-danger show">{error}</div>
            )}
            <InputField
              type="text"
              title="Category Name"
              name="name"
              formik={formik}
              onFocus={() => error && dispatch(resetCategoryErrors())}
            />

            <div className="mt-5 d-flex justify-content-center">
              <Button
                className="bg-primary text-white"
                color="none"
                type="submit"
                onClick={formik.handleSubmit}
              >
                {pageType === "add" ? "Add " : "Update "}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddUpdateCategory;
