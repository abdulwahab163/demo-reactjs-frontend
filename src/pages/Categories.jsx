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
            <Link
              className="custom-link"
              to="/add-update-category"
              state={{ category: item }}
            >
              Edit
            </Link>
            <div
              className="custom-link"
              onClick={() => dispatch(deleteCategory(item._id))}
            >
              Delete
            </div>
          </div>
        ),
      };
    });
    setRows(data);
  };

  if (catReducer.loading) {
    return <CircularProgress style={{ height: "50px", width: "50px" }} />;
  }

  if (catReducer.error) {
    return <div>{catReducer.error}</div>;
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
