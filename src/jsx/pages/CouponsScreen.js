import React, { useEffect } from "react";
import { Button, Card, Table } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getCoupons } from "../../actions/couponsActions";
import Loader from "../components/Loader";
import Message from "../components/Message";

const CouponsScreen = ({ history }) => {
  const couponsList = useSelector((state) => state.couponsList);
  const { loading, error: couponsError, coupons } = couponsList;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCoupons());
  }, [dispatch]);

  const deleteCouponHandler = async (id) => {
    let formdata = new FormData();
    formdata.set("id", id);
    if (window.confirm("Are you sure")) {
      //dispatch(deleteCoupon(id, dispatch));
    }
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
              <Link to="/category/addcategory">
                <Button variant="secondary mb-2">Add New Category</Button>
              </Link>
            </div>
          </div>

          <Card>
            <Card.Body>
              <Table responsive className="header-border ">
                <thead>
                  <tr>
                    <th> Id</th>
                    <th> Name</th>
                    <th> Image</th>
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
                            history.push(`/category/addcategory/${item.id}`);
                          }}
                        >
                          {item.id}
                        </td>
                        <td
                          style={{
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            history.push(`/category/addcategory/${item.id}`);
                          }}
                        >
                          {item.name || item.name_en}
                        </td>
                        <td
                          style={{
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            history.push(`/category/addcategory/${item.id}`);
                          }}
                        >
                          <Card.Img
                            style={{
                              height: "80px",
                              width: "80px",
                              objectFit: "contain",
                            }}
                            src={item.fullimageurl}
                            variant="top"
                          />
                        </td>

                        <td>
                          <div className="d-flex justify-content-around">
                            <i
                              className="fa fa-trash"
                              style={{
                                cursor: "pointer",
                                color: "red",
                              }}
                              onClick={() => deleteCouponHandler(item.id)}
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
