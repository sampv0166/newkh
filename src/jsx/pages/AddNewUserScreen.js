import React from "react";
import { useLayoutEffect } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createUser, listUserDetails } from "../../actions/userActions";
import * as Yup from "yup";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { ErrorMessage, Form, Formik } from "formik";
import TextField from "../components/TextField";
import { Card, Col, Row } from "react-bootstrap";
import CheckboxGroup from "../components/CheckboxGroup";
import Select from "../components/Select";
import { getCategory } from "../../actions/categoryActions";

const AddNewUserScreen = ({ match, history }) => {
  const [userImage, setUserImage] = useState([]);
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userCreate = useSelector((state) => state.userCreate);
  const { loading: loadingcreate, error: errorcreate } = userCreate;
  const dispatch = useDispatch();

  const [permissions, setPermissions] = useState([
    { key: "add", value: "add" },
    { key: "update", value: "update" },
    { key: "delete", value: "delete" },
  ]);

  const shopList = useSelector((state) => state.shopList);
  const { shoploading, shopError, shops } = shopList;

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const populateShops = () => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    if (user.user.typeofuser === "A") {
      let objects = [2];

      objects[0] = {
        key: user.user.name,
        value: user.user.shop_id,
      };
      objects.unshift({ key: "choose", value: "" });

      return objects;
    }

    if (user.user.typeofuser === "S") {
      let objects = [shops.length];
      for (var x = 0; x < shops.length; x++) {
        objects[x] = { key: shops[x].shop_name, value: shops[x].id };
      }
      objects.unshift({ key: "choose", value: "" });
      return objects;
    }
  };

  const userId = match.params.id;

  const handleImageChange = (e, formik) => {
    if (e.target.files) {
      const U = URL.createObjectURL(e.target.files[0]);
      setUserImage(U);
      URL.revokeObjectURL(e.target.files);
    }

    formik.setFieldValue("image", e.currentTarget.files[0]);
  };

  useEffect(() => {
    if (user) {
      setUserImage(user.photo);
      /*if (category.active === true) {
            setActive({ checked: true });
          } else {
            setActive({ checked: false });
          }*/
    }
  }, [user]);

  useLayoutEffect(() => {
    dispatch(getCategory());
    //dispatch(listUserDetails(userId));
  }, [dispatch, userId]);

  const validate = Yup.object({
    name: Yup.string()
      .min(1, "Name must be atleast one character")
      .required("Required"),
    email: Yup.string().email("email is invalid").required("Required"),
    password: Yup.string()
      .min(6, "password must be 6 characters")
      .required("Required"),
  });

  const handleSubmit = async (formdata) => {
    dispatch(createUser(dispatch, formdata));
    history.push("/usersList/page/1");
  };

  return (
    <>
      {loading || loadingcreate ? (
        <Loader />
      ) : error || errorcreate ? (
        <Message variant="danger">{error || errorcreate}</Message>
      ) : (
        <Formik
          enableReinitialize
          initialValues={{
            product: "",
            shop: "",
            category: "",
            variation: "",
            order: "",
            users: "",
            name: "",
            email: "",
            password: "",
            image: "",
            shop_id: "",
          }}
          validationSchema={validate}
          onSubmit={(values) => {
            let formdata = new FormData();

            if (userId) {
              formdata.append("id", userId);
            }
            formdata.append("name", values.name);
            formdata.append("email", values.email);
            formdata.append("password", values.password);

            if (typeof values.image === "string") {
              formdata.delete("image");
            } else {
              formdata.append("photo", values.photo);
            }

            let permissionlsit = {
              product: values.product,
              shop: values.shop,
              category: values.category,
              variations: values.variation,
            };

            values.product.map((item) => {
              let str1 = "product.";
              let str2 = item;
              let res = str1.concat(str2);

              formdata.append("add_permission[]", res);
            });

            values.shop.map((item) => {
              let str1 = "shop.";
              let str2 = item;
              let res = str1.concat(str2);

              formdata.append("add_permission[]", res);
            });

            values.category.map((item) => {
              let str1 = "category.";
              let str2 = item;
              let res = str1.concat(str2);

              formdata.append("add_permission[]", res);
            });

            values.variation.map((item) => {
              let str1 = "variation.";
              let str2 = item;
              let res = str1.concat(str2);

              formdata.append("add_permission[]", res);
            });

            values.users.map((item) => {
              let str1 = "user.";
              let str2 = item;
              let res = str1.concat(str2);

              formdata.append("add_permission[]", res);
            });

            values.order.map((item) => {
              let str1 = "order.";
              let str2 = item;
              let res = str1.concat(str2);

              formdata.append("add_permission[]", res);
            });

            if (userInfo.user.typeofuser === "S") {
              formdata.append("shop_id", values.shop_id);
            }

            if (userInfo.user.typeofuser === "A") {
              formdata.append("shop_id", userInfo.user.shop_id);
            }

            for (var value of formdata.values()) {
              console.log(value);
            }

            handleSubmit(formdata);
          }}
        >
          {(formik) => (
            <Form>
              <div>
                <div className="row">
                  <div className="col-md-6">
                    {userId ? (
                      <div>
                        <Card
                          className="my-2 p-1 rounded"
                          style={{ height: "280px", objectFit: "cover" }}
                        >
                          <Card.Img
                            style={{ height: "270px", objectFit: "contain" }}
                            src={userImage}
                            variant="top"
                          />
                        </Card>

                        <div className="d-flex my-2 ">
                          <label className="custom-file-upload w-100">
                            <input
                              type="file"
                              onChange={(e) => handleImageChange(e, formik)}
                              name="image"
                            />
                            <ErrorMessage
                              component="div"
                              className="error text-danger"
                              name={"image"}
                            />
                            <i className="bx bx-cloud-upload mx-2"></i>Upload
                            New Image
                          </label>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <Card
                          className="my-2 p-1 rounded"
                          style={{ height: "280px", objectFit: "cover" }}
                        >
                          <Card.Img
                            style={{ height: "270px", objectFit: "contain" }}
                            src={userImage}
                            variant="top"
                          />
                        </Card>

                        <div className="d-flex my-2 ">
                          <label className="custom-file-upload w-100">
                            <input
                              type="file"
                              onChange={(e) => handleImageChange(e, formik)}
                              name="image"
                            />
                            <ErrorMessage
                              component="div"
                              className="error text-danger"
                              name={"image"}
                            />
                            <i className="bx bx-cloud-upload mx-2"></i>Upload
                            New Image
                          </label>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="col-md-6">
                    <div className="row g-3">
                      <div className="col-md-6">
                        <TextField label="Name" name="name" type="text" />
                      </div>
                      <div className="col-md-6">
                        <TextField label="email" name="email" type="text" />
                      </div>
                    </div>
                    <div className="row g-3">
                      <div className="col-md-12">
                        <TextField
                          label="Admin Password"
                          name="password"
                          type="password"
                        />
                      </div>
                    </div>

                    <div className="row g-3">
                      <div className="col-md-12">
                        {userInfo.user.typeofuser === "S" ? (
                          <Col className="col-md-6">
                            <Select
                              control="select"
                              label="Shop Name"
                              name="shop_id"
                              options={populateShops()}
                            ></Select>
                          </Col>
                        ) : (
                          ""
                        )}

                        {userInfo.user.typeofuser === "A" ? (
                          <Col className="col-md-6">
                            <Select
                              control="select"
                              label="Shop Name"
                              name="shop_id"
                              options={populateShops()}
                            ></Select>
                          </Col>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>

                    <button
                      className="btn btn-success mt-3 my-2 px-5"
                      type="submit"
                    >
                      Save
                    </button>
                  </div>
                </div>
                <Row>
                  <Col className="col-3">
                    <CheckboxGroup
                      control="checkbox"
                      label="Product Permissions"
                      name="product"
                      options={permissions}
                    />

                    {console.log(formik.values)}
                  </Col>
                  <Col className="col-3">
                    <CheckboxGroup
                      control="checkbox"
                      label="Category Permissions"
                      name="category"
                      options={permissions}
                    />
                  </Col>
                  <Col className="col-3">
                    <CheckboxGroup
                      control="checkbox"
                      label="Shop Permissions"
                      name="shop"
                      options={permissions}
                    />
                  </Col>
                  <Col className="col-3">
                    <CheckboxGroup
                      control="checkbox"
                      label="Variation Permissions"
                      name="variation"
                      options={permissions}
                    />
                  </Col>

                  <Col className="col-3">
                    <CheckboxGroup
                      control="checkbox"
                      label="User Permissions"
                      name="order"
                      options={permissions}
                    />
                  </Col>

                  <Col className="col-3">
                    <CheckboxGroup
                      control="checkbox"
                      label="Order Permissions"
                      name="users"
                      options={permissions}
                    />
                  </Col>
                </Row>
              </div>
            </Form>
          )}
        </Formik>
      )}
    </>
  );
};

export default AddNewUserScreen;
