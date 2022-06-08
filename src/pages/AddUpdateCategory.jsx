import React, { useState, useEffect } from "react";
import { CircularProgress } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { Button, Label, Input } from "reactstrap";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";

import { categoryValidationSchema } from "../utils/validationSchemas";
import { getFormikError } from "../utils/helperFunctions";
import { addCategory, resetCategoryErrors } from "../redux/actions/categories";

const AddUpdateCategory = (props) => {
  const { id } = useParams();
  const location = useLocation();
  const dispatch = useDispatch();

  const navigation = useNavigate();

  const { loading, error } = useSelector(({ categories }) => categories);

  const [pageType, setPageType] = useState("add");

  useEffect(() => {
    const { pathname, state } = location;
    if (id && pathname.includes("edit")) {
      setPageType("edit");
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
    dispatch(addCategory(values,navigation));
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
            <div className="mt-4">
            {error && <div className="fade alert alert-danger show">{error}</div>}
              <Label className="d-flex">Category Name</Label>

              <Input
                type="text"
                name="name"
                value={formik.values["name"]}
                onChange={formik.handleChange}
                onFocus={() => error && dispatch(resetCategoryErrors())}
                style={{
                  maxWidth: "350px",
                  border:
                    formik.touched["name"] && formik.errors["name"]
                      ? "2px solid #FF6565"
                      : null,
                }}
              />

              {getFormikError(formik, "name")}
            </div>

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
