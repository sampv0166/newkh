import React, { useEffect, useLayoutEffect, useState } from "react";
import { Badge, Card, Col, Image, ListGroup, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { listOrderDetailsById } from "../../actions/orderActions";
import { listProductDetails } from "../../actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";

const OrderDetailsScreen = ({ match, history, setHasVariant }) => {
  const orderDetailsList = useSelector((state) => state.orderDetailsList);
  const { loading, error, ordersDetails } = orderDetailsList;

  const orderId = match.params.id;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listOrderDetailsById(orderId));
  }, [dispatch, orderId]);

  useLayoutEffect(() => {
    dispatch(listOrderDetailsById(orderId));
    console.log(ordersDetails);
  }, [dispatch, orderId]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div>
          {ordersDetails && ordersDetails.user && (
            <Row>
              <Col md={8}>
                <Card border="light" className="bg-white shadow-sm">
                  <Card.Body>
                    <ListGroup variant="flush">
                      <ListGroup.Item>
                        <h2>
                          {" "}
                          {ordersDetails &&
                          ordersDetails.payment_status === 0 ? (
                            <Badge variant="warning">pending</Badge>
                          ) : (
                            ""
                          )}
                          {ordersDetails &&
                          ordersDetails.payment_status === 1 ? (
                            <Badge variant="success">confirmed</Badge>
                          ) : (
                            ""
                          )}
                          {ordersDetails.payment_status === 2 ? (
                            <Badge variant="primary">shipping</Badge>
                          ) : (
                            ""
                          )}
                          {ordersDetails.payment_status === 3 ? (
                            <Badge variant="danger">rejected</Badge>
                          ) : (
                            ""
                          )}
                          {ordersDetails.payment_status === 4 ? (
                            <Badge variant="secondary">delivered</Badge>
                          ) : (
                            ""
                          )}
                          {ordersDetails.payment_status === 5 ? (
                            <Badge variant="danger">cancelled</Badge>
                          ) : (
                            ""
                          )}
                        </h2>
                        <p>
                          <strong>Name: </strong>{" "}
                          {ordersDetails &&
                            ordersDetails.user &&
                            ordersDetails.user.name}
                        </p>
                        <p>
                          <strong>Email: </strong>
                          {ordersDetails.user.email}
                        </p>
                        <p>
                          <strong>Address: </strong>
                          {ordersDetails.address}
                        </p>
                        <p>
                          <strong>Phone: </strong>
                          {ordersDetails.phone}
                        </p>
                        <p>
                          <strong>Whatsapp: </strong>
                          {ordersDetails.haswhatsapp === true ? "Yes" : "No"}
                        </p>
                      </ListGroup.Item>

                      <ListGroup.Item>
                        <h2>Order Items</h2>

                        <ListGroup variant="flush">
                          {ordersDetails.products &&
                            ordersDetails.products.map((item, index) => (
                              <Link
                                to={`/ecom/product-edit/${
                                  item.product_info && item.product_info.id
                                }`}
                              >
                                <ListGroup.Item
                                  key={index}
                                  style={{ cursor: "pointer" }}
                                  onClick={() => {
                                    if (
                                      item.product_info &&
                                      item.product_info.variations.length ===
                                        1 &&
                                      item.product_info &&
                                      item.product_info.variations[0]
                                        .color_name === null &&
                                      item.product_info &&
                                      item.product_info.variations[0]
                                        .size_value === null
                                    ) {
                                      setHasVariant({ checked: false });
                                    } else {
                                      setHasVariant({ checked: true });
                                    }
                                  }}
                                >
                                  <Row>
                                    <Col md={1}>
                                      <Image
                                        src={
                                          item.product_info &&
                                          item.product_info.coverimage
                                        }
                                        alt={''}
                                        fluid
                                        rounded
                                      />
                                    </Col>
                                    <Col>{item.name_en}</Col>
                                    <Col md={4}>
                                      {item.quantity} x ${item.product_price} =
                                      ${item.quantity * item.product_price}
                                    </Col>
                                  </Row>
                                </ListGroup.Item>
                              </Link>
                            ))}
                        </ListGroup>
                      </ListGroup.Item>
                    </ListGroup>
                  </Card.Body>
                </Card>
              </Col>

              <Col md={4}>
                <Card>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <Row>
                        <Col>Items</Col>
                        <Col>{ordersDetails.products.length}</Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>Shipping</Col>
                        <Col>${ordersDetails.delivery_charge}</Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>Tax</Col>
                        <Col>${ordersDetails.tax}</Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>Total</Col>
                        <Col>${ordersDetails.total_amount}</Col>
                      </Row>
                    </ListGroup.Item>
                  </ListGroup>
                </Card>
              </Col>
            </Row>
          )}
        </div>
      )}
    </>
  );
};

export default OrderDetailsScreen;
