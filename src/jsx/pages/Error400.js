import React from "react";
import { Link } from "react-router-dom";

const Error400 = () => {
  return (
    <div className="row justify-content-center align-items-center error-page-area">
      <div className="col-lg-5 col-md-9">
        <div className="form-input-content text-center error-page">
          <p className="text-danger">You Dont Have Enough Permissions</p>
          <div>
            <Link className="btn btn-primary" to="/react">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Error400;
