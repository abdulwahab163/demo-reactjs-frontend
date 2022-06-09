import React, { useState, useEffect } from "react";
import { CircularProgress } from "@material-ui/core";
import { MDBDataTableV5 } from "mdbreact";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "reactstrap";
import { useNavigate, Link } from "react-router-dom";

import { deleteCar, getAllCars } from "../redux/actions/cars";
import { getAllCategories } from "../redux/actions/categories";

import "mdbreact/dist/css/mdb.css";
import "../styles/dataTable.css";

const columns = [
  {
    label: "ID",
    field: "_id",
  },
  {
    label: "Name",
    field: "name",
  },
  {
    label: "Category",
    field: "category",
  },
  {
    label: "Color",
    field: "color",
  },
  {
    label: "Model",
    field: "model",
  },
  {
    label: "Make",
    field: "make",
  },
  {
    label: "Registration",
    field: "registration",
  },
  {
    label: "Actions",
    field: "actions",
  },
];

const Cars = () => {
  const dispatch = useDispatch();
  const navigation = useNavigate();

  const carReducer = useSelector(({ cars }) => cars);
  const { categoriesList } = useSelector(({ categories }) => categories);

  const [rows, setRows] = useState([]);

  useEffect(() => {
    dispatch(getAllCars());
    dispatch(getAllCategories());
  }, []);

  useEffect(() => {
    if (carReducer.carsList.length > 0) {
      setRowData();
    }
  }, [carReducer]);

  const setRowData = () => {
    let data =
      categoriesList &&
      carReducer.carsList.map((item) => {
        const categoriesName = categoriesList?.filter(
          (cat) => item.category_id === cat._id
        )[0];
        return {
          ...item,
          category: categoriesName?.name,
          actions: (
            <div className="d-flex justify-content-between">
              <Link to="/add-update-car" state={{ car: item }}>
                <i className="fas fa-pen" aria-hidden="true"></i>
              </Link>
              <div
                className="pointer"
                onClick={() => dispatch(deleteCar(item._id))}
              >
                <i className="fa fa-trash" aria-hidden="true"></i>
              </div>
            </div>
          ),
        };
      });
    setRows(data);
  };

  if (carReducer.loading) {
    return <CircularProgress style={{ height: "50px", width: "50px", position: "absolute", top: "50%", right: "50%" }} />
  }

  if (carReducer.error) {
    return (
      <div className="fade alert alert-danger show">{carReducer.error}</div>
    );
  }

  if (!carReducer.carsList.length > 0) {
    return (
      <div style={{ position: "absolute", top: "50%", right: "50%" }}>
        No Data Found
      </div>
    );
  }

  return (
    <div className="container">
      <div className="d-flex justify-content-evenly">
        <h5 className="mb-5 mt-3">Cars</h5>
        <div className="mt-4">
          <Button
            className="bg-primary text-white"
            color="none"
            onClick={() => navigation("/add-update-car")}
          >
            Add Car
          </Button>
        </div>
      </div>
      <div className="d-flex justify-content-center">
        <MDBDataTableV5
          striped
          bordered
          searchTop
          searchBottom={false}
          hover
          entriesOptions={[5, 20, 25]}
          entries={5}
          pagesAmount={4}
          data={{ columns, rows }}
        />
      </div>
    </div>
  );
};

export default Cars;
