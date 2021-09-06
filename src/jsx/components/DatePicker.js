import React from "react";
import DateView from "react-datepicker";
import { Field, ErrorMessage } from "formik";

import "react-datepicker/dist/react-datepicker.css";

function DatePicker(props) {
  const { label, name, ...rest } = props;
  return (
    <div className="border-0">
      
      <Field name={name} className="form-group border-0">
        {({ form, field }) => {
          const { setFieldValue } = form;
          const { value } = field;
          return (
            <DateView
              id={name}
              {...field}
              {...rest}
              selected={value}
              onChange={(val) => setFieldValue(name, val)}
              className = 'form-control'
            />
          );
        }}
      </Field>

      <ErrorMessage component="div" name={name} className="error text-danger" />
    </div>
  );
}

export default DatePicker;
