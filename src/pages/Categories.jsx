import React, { useState } from "react";
import { MDBDataTableV5 } from "mdbreact";
import { useNavigate } from "react-router-dom";
import { Button } from "reactstrap";

const Categories = () => {

  const navigation = useNavigate();

  const [datatable, setDatatable] = useState({
    columns: [
      {
        label: "Name",
        field: "name",
        width: 150,
        attributes: {
          "aria-controls": "DataTable",
          "aria-label": "Name",
        },
      },
      {
        Header: "Actions",
        style: { textAlign: "center" },
        accessor: "",
        Cell: (props) => (
          <div>
            <span
              className="mr-4"
              // onClick={() => {
              //   navigate(`/admin/editCategory/${props.original.id}`, {
              //     state: { category: props.original, level: "one" },
              //   });
              // }}
            >
              Edit
            </span>
            <span
            // onClick={() => {
            //   setDialogue(true);
            //   setDeleteData(props.original.id);
            // }}
            >
              Delete
            </span>
          </div>
        ),
      },
    ],
    rows: [
      {
        name: "Tiger Nixon",
      },
      {
        name: "Garrett Winters",
      },
      {
        name: "Ashton Cox",
      },
      {
        name: "Cedric Kelly",
      },
      {
        name: "Airi Satou",
      },
    ],
  });

  return (
    <div className=" d-flex justify-content-center flex-column">
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
      <div className="d-flex justify-content-between">
        <MDBDataTableV5
          searchTop
          searchBottom={false}
          hover
          entriesOptions={[5, 20, 25]}
          entries={5}
          pagesAmount={4}
          data={datatable}
        />
      </div>
    </div>
  );
};

export default Categories;
