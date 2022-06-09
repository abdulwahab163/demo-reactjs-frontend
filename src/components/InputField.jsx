import React from "react";
import { Label, Input } from "reactstrap";

import { getFormikError } from "../utils/helperFunctions";

const InputField = ({ title, name, formik, ...props }) => {
  return (
    <div className="mt-4">
      <Label className="d-flex">{title}</Label>
      <Input
      name={name}
        value={formik.values[name]}
        onChange={formik.handleChange}
        style={{
          maxWidth: "350px",
          border:
            formik.touched[name] && formik.errors[name]
              ? "2px solid #FF6565"
              : null,
        }}
        {...props}
      />

      {getFormikError(formik, name)}
    </div>
  );
};

export default InputField;
