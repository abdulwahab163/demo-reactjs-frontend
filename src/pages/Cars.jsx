import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "reactstrap";

const Cars = () => {
  const navigation = useNavigate();

  return (
    <div className=" d-flex justify-content-center flex-column">
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
    </div>
  );
};

export default Cars;
