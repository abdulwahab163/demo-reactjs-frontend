import React, { useState, useEffect } from "react";
import { CircularProgress } from "@material-ui/core";
import { MDBDataTableV5 } from "mdbreact";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "reactstrap";
import { useNavigate, Link } from "react-router-dom";

import { deleteCategory, getAllCategories } from "../redux/actions/categories";

import "mdbreact/dist/css/mdb.css";
import "../styles/dataTable.css";

const Categories = () => {
  const dispatch = useDispatch();
  const navigation = useNavigate();

  const catReducer = useSelector(({ categories }) => categories);

  const [rows, setRows] = useState([]);

  useEffect(() => {
    dispatch(getAllCategories());
  }, []);

  useEffect(() => {
    if (catReducer.categoriesList.length > 0) {
      setRowData();
    }
  }, [catReducer]);

  const columns = [
    {
      label: "ID",
      field: "id",
    },
    {
      label: "Name",
      field: "name",
    },
    {
      label: "Actions",
      field: "actions",
    },
  ];

  const setRowData = () => {
    let data = catReducer.categoriesList.map((item) => {
      return {
        id: item._id,
        name: item.name,
        actions: (
          <div className="d-flex justify-content-between">
            <Link to="/add-update-category" state={{ category: item }}>
              <i className="fas fa-pen" aria-hidden="true"></i>
            </Link>
            <div
              className="pointer"
              onClick={() => dispatch(deleteCategory(item._id))}
            >
              <i className="fa fa-trash" aria-hidden="true"></i>
            </div>
          </div>
        ),
      };
    });
    setRows(data);
  };

  if (catReducer.loading) {
    <CircularProgress
      style={{
        height: "50px",
        width: "50px",
        position: "absolute",
        top: "50%",
        right: "50%",
      }}
    />;
  }

  if (catReducer.error) {
    return (
      <div className="fade alert alert-danger show">{catReducer.error}</div>
    );
  }

  if (!catReducer.categoriesList.length > 0) {
    return (
      <div style={{ position: "absolute", top: "50%", right: "50%" }}>
        No Data Found
      </div>
    );
  }

  return (
    <div className="container">
      <div className="d-flex justify-content-evenly">
        <h5 className="mb-5 mt-3">Categories</h5>
        <div className="mt-4">
          <Button
            className="bg-primary text-white"
            color="none"
            onClick={() => navigation("/add-update-category")}
          >
            Add Category
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

export default Categories;
