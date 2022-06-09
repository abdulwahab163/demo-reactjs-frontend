import React, { useState, useEffect } from "react";
import { CircularProgress } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { Button, Label, Input } from "reactstrap";
import { useNavigate, useLocation } from "react-router-dom";
import { useFormik } from "formik";

import { carValidationSchema } from "../utils/validationSchemas";
import { getFormikError } from "../utils/helperFunctions";
import { addCar, resetCarErrors, updateCar } from "../redux/actions/cars";
import InputField from "../components/InputField";

const yearList = [
  "2010", "2011", "2012", "2013","2014", "2015", "2016", "2017","2018","2019","2020",
];

const AddUpdateCategory = (props) => {
  const location = useLocation();
  const dispatch = useDispatch();

  const navigation = useNavigate();

  const catReducer = useSelector(({ categories }) => categories);
  const carReducer = useSelector(({ cars }) => cars);

  const [pageType, setPageType] = useState("add");

  useEffect(() => {
    const { state } = location;
    if (state?.car) {
      setPageType("edit");
      formik.setValues({
        category_id: state.car.category_id,
        name: state.car.name,
        color: state.car.color,
        model: state.car.model,
        make: state.car.make,
        registration: state.car.registration,
      });
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
    if (pageType === "edit") {
      dispatch(updateCar(location.state.car._id, values, navigation));
    } else {
      dispatch(addCar(values, navigation));
    }
  };

  if (catReducer.loading || carReducer.loading) {
    return (
      <div className="mt-5">
        <CircularProgress style={{ height: "50px", width: "50px" }} />;
      </div>
    );
  }

  return (
    <div>
      <div className="p-4 ">
        {catReducer.error && (
          <div className="fade alert alert-danger show">{catReducer.error}</div>
        )}
        {carReducer.error && (
          <div className="fade alert alert-danger show">{carReducer.error}</div>
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
                  onFocus={() => carReducer.error && dispatch(resetCarErrors())}
                  style={{
                    maxWidth: "350px",
                    border:
                      formik.touched["category_id"] &&
                      formik.errors["category_id"]
                        ? "2px solid #FF6565"
                        : null,
                  }}
                >
                  {!formik.values["category_id"] && (
                    <option>Please Select Category</option>
                  )}

                  {catReducer.categoriesList?.length > 0 &&
                    catReducer.categoriesList.map((item) => (
                      <option key={item._id} value={item._id}>
                        {item.name}
                      </option>
                    ))}
                </Input>
                {getFormikError(formik, "category_id")}
              </div>
              <InputField
                type="text"
                name="name"
                title="Car Name"
                formik={formik}
                onFocus={() => carReducer.error && dispatch(resetCarErrors())}
              />
            </div>
            <div className="row flex-nowrap">
              <InputField
                type="text"
                name="color"
                title="Car Color"
                formik={formik}
                onFocus={() => carReducer.error && dispatch(resetCarErrors())}
              />
              <InputField
                type="text"
                name="model"
                title="Car Model"
                formik={formik}
                onFocus={() => carReducer.error && dispatch(resetCarErrors())}
              />
            </div>
            <div className="row flex-nowrap">
              <div className="mt-4">
                <Label className="d-flex">Category Make</Label>

                <Input
                  type="select"
                  name="make"
                  value={formik.values["make"]}
                  onChange={formik.handleChange}
                  onFocus={() => carReducer.error && dispatch(resetCarErrors())}
                  style={{
                    maxWidth: "350px",
                    border:
                      formik.touched["make"] && formik.errors["make"]
                        ? "2px solid #FF6565"
                        : null,
                  }}
                >
                  {!formik.values["make"] && (
                    <option>Please Select Date</option>
                  )}

                  {yearList.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </Input>
                {getFormikError(formik, "make")}
              </div>

              <InputField
                type="text"
                name="registration"
                title="Car Reg No"
                formik={formik}
                onFocus={() => carReducer.error && dispatch(resetCarErrors())}
              />
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
