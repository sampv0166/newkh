import React, { useEffect } from "react";
import { Button, Card, Table } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteCoupon, getCoupons } from "../../actions/couponsActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { checkPermissionOnSubmit } from "./checkpermission";

const CouponsScreen = ({ history }) => {
  const couponsList = useSelector((state) => state.couponsList);
  const { loading, error: couponsError, coupons } = couponsList;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCoupons(""));
  }, [dispatch]);

  const deleteCouponHandler = async (id) => {
    let formdata = new FormData();
    formdata.set("id", id);
    if (window.confirm("Are you sure")) {
      dispatch(deleteCoupon(formdata, dispatch));
    }
  };

  const clickHandler = (id) => {
    history.push(`/coupon/edit/${id}`);
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : couponsError ? (
        <Message variant="danger">{couponsError}</Message>
      ) : (
        <div>
          <div className="d-flex justify-content-between my-4">
            <div>
              <Link to="/addnewcoupon">
                <Button variant="secondary mb-2">Add New Coupon</Button>
              </Link>
            </div>
          </div>

          <Card>
            <Card.Body>
              <Table responsive className="header-border ">
                <thead>
                  <tr>
                    <th> Id</th>
                    <th> Code</th>
                    <th> Description</th>
                    <th> Value</th>
                    <th> Expired</th>
                  </tr>
                </thead>

                <tbody>
                  {coupons &&
                    coupons.map((item, index) => (
                      <tr key={index}>
                        <td
                          style={{
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            clickHandler(item.id);
                          }}
                        >
                          {item.id}
                        </td>
                        <td
                          style={{
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            clickHandler(item.id);
                          }}
                        >
                          {item.code}
                        </td>

                        <td
                          style={{
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            clickHandler(item.id);
                          }}
                        >
                          {item.description_en}
                        </td>

                        <td
                          style={{
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            clickHandler(item.id);
                          }}
                        >
                          {item.value}
                        </td>

                        <td
                          style={{
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            clickHandler(item.id);
                          }}
                        >
                          {item.expired_at}
                        </td>

                        <td>
                          <div className="d-flex justify-content-around">
                            <i
                              className="fa fa-trash"
                              style={{
                                cursor: "pointer",
                                color: "red",
                              }}
                              onClick={() => {
                                if (checkPermissionOnSubmit("coupon.update")) {
                                  history.push("/error");
                                  return;
                                }
                                deleteCouponHandler(item.id);
                              }}
                            ></i>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </div>
      )}
    </>
  );
};

export default CouponsScreen;
