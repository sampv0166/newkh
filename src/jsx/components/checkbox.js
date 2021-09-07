import React from "react";
import { Col } from "react-bootstrap";

const checkbox = ({ status, formik, setChecked, formikField }) => {
  return (
    <div>
      <Col>
        <div className="form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            id="flexSwitchCheckDefault"
            checked={status}
            onChange={(d) => {
              status === true ? (d = false) : (d = true);
              setChecked({ checked: d });
              formik.setFieldValue(formikField, d);
            }}
          />
          <label className="form-check-label">Best Seller</label>
        </div>
      </Col>
    </div>
  );
};

export default checkbox;
