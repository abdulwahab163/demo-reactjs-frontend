import React, { useState, useEffect } from "react";
import { CircularProgress } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { Button, Label, Input } from "reactstrap";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useFormik } from "formik";

import { carValidationSchema } from "../utils/validationSchemas";
import { getFormikError } from "../utils/helperFunctions";
import { addCar, resetCarErrors } from "../redux/actions/cars";
import { getAllCategories } from "../redux/actions/categories";

const AddUpdateCategory = (props) => {
  const { id } = useParams();
  const location = useLocation();
  const dispatch = useDispatch();

  const navigation = useNavigate();

  const categories = useSelector(({ categories }) => categories);
  const cars = useSelector(({ cars }) => cars);

  const [pageType, setPageType] = useState("add");

  useEffect(() => {
    dispatch(getAllCategories());
    const { pathname, state } = location;
    if (id && pathname.includes("edit")) {
      setPageType("edit");
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      category_id: "",
      name: "",
      color: "",
      model: "",
      make: "",
      registration: "",
    },
    validationSchema: carValidationSchema,
    onSubmit: (values) => {
      handleAddCar(values);
    },
  });

  const handleAddCar = (values) => {
    dispatch(addCar(values, navigation));
  };

  if (categories.loading || cars.loading) {
    return (
      <div className="mt-5">
        <CircularProgress style={{ height: "50px", width: "50px" }} />;
      </div>
    );
  }

  return (
    <div>
      <div className="p-4 ">
        {categories.error && (
          <div className="fade alert alert-danger show">{categories.error}</div>
        )}
        {cars.error && (
          <div className="fade alert alert-danger show">{cars.error}</div>
        )}
        <div className="d-flex justify-content-center">
          <h2>{pageType === "add" ? "Add New " : "Edit "} Car</h2>
        </div>
        <div className="d-flex justify-content-center">
          <form>
            <div className="row flex-nowrap">
              <div className="mt-4">
                <Label className="d-flex">Category Name</Label>

                <Input
                  type="select"
                  name="category_id"
                  value={formik.values["category_id"]}
                  onChange={formik.handleChange}
                  onFocus={() => cars.error && dispatch(resetCarErrors())}
                  style={{
                    maxWidth: "350px",
                    border:
                      formik.touched["category_id"] && formik.errors["category_id"]
                        ? "2px solid #FF6565"
                        : null,
                  }}
                >
                  {!formik.values["category_id"] && (
                    <option>Please Select Category</option>
                  )}

                  {categories.categoriesList?.length > 0 &&
                    categories.categoriesList.map((item) => (
                      <option key={item._id} value={item._id}>
                        {item.name}
                      </option>
                    ))}
                </Input>

                {getFormikError(formik, "category_id")}
              </div>
              <div className="mt-4">
                <Label className="d-flex">Car Name</Label>

                <Input
                  type="text"
                  name="name"
                  value={formik.values["name"]}
                  onChange={formik.handleChange}
                  onFocus={() => cars.error && dispatch(resetCarErrors())}
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
            </div>
            <div className="row flex-nowrap">
              <div className="mt-4">
                <Label className="d-flex">Car Color</Label>

                <Input
                  type="text"
                  name="color"
                  value={formik.values["color"]}
                  onChange={formik.handleChange}
                  onFocus={() => cars.error && dispatch(resetCarErrors())}
                  style={{
                    maxWidth: "350px",
                    border:
                      formik.touched["color"] && formik.errors["color"]
                        ? "2px solid #FF6565"
                        : null,
                  }}
                />

                {getFormikError(formik, "color")}
              </div>
              <div className="mt-4">
                <Label className="d-flex">Car Model</Label>

                <Input
                  type="text"
                  name="model"
                  value={formik.values["model"]}
                  onChange={formik.handleChange}
                  onFocus={() => cars.error && dispatch(resetCarErrors())}
                  style={{
                    maxWidth: "350px",
                    border:
                      formik.touched["model"] && formik.errors["model"]
                        ? "2px solid #FF6565"
                        : null,
                  }}
                />

                {getFormikError(formik, "model")}
              </div>
            </div>
            <div className="row flex-nowrap">
              <div className="mt-4">
                <Label className="d-flex">Car Make</Label>

                <Input
                  type="text"
                  name="make"
                  value={formik.values["make"]}
                  onChange={formik.handleChange}
                  onFocus={() => cars.error && dispatch(resetCarErrors())}
                  style={{
                    maxWidth: "350px",
                    border:
                      formik.touched["make"] && formik.errors["make"]
                        ? "2px solid #FF6565"
                        : null,
                  }}
                />

                {getFormikError(formik, "make")}
              </div>
              <div className="mt-4">
                <Label className="d-flex">Car Reg No</Label>

                <Input
                  type="text"
                  name="registration"
                  value={formik.values["registration"]}
                  onChange={formik.handleChange}
                  onFocus={() => cars.error && dispatch(resetCarErrors())}
                  style={{
                    maxWidth: "350px",
                    border:
                      formik.touched["registration"] &&
                      formik.errors["registration"]
                        ? "2px solid #FF6565"
                        : null,
                  }}
                />

                {getFormikError(formik, "registration")}
              </div>
            </div>

            <div className="mt-5 d-flex justify-content-end">
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
