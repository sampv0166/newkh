import { ErrorMessage, Form, Formik } from "formik";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { Card, Col, Image, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  createShop,
  listShopDetails,
  listShops,
} from "../../actions/shopActions";
import * as Yup from "yup";
import TextField from "../components/TextField";
import Loader from "../components/Loader";
import Message from "../components/Message";

import CheckboxGroup from "../components/CheckboxGroup";
import checkPermission, { checkPermissionOnSubmit } from "./checkpermission";
const AddNewShopScreen = ({ match, history }) => {
  const [currentShop, setCurrentShop] = useState([]);
  const [shopCoverImage, setShopCoverImage] = useState([]);
  const [shopBannerImage, setShopBannerImage] = useState([]);
  const [open, setopen] = useState({ checked: false });
  const [active, setActive] = useState({ checked: false });

  const [permissions, setPermissions] = useState([
    { key: "add", value: "add" },
    { key: "update", value: "update" },
    { key: "delete", value: "delete" },
  ]);

  const shopId = match.params.id;

  const shopListDetails = useSelector((state) => state.shopListDetails);
  const { loading, error, shop } = shopListDetails;

  const shopCreate = useSelector((state) => state.shopCreate);
  const { loading: loadingcreate, error: errorcreate } = shopCreate;

  const shopList = useSelector((state) => state.shopList);
  const { loading: shoploadingcreate, error: shoperrorcreate } = shopList;

  const dispatch = useDispatch();

  const handleImageChange = (e, formik) => {
    if (e.target.files) {
      const U = URL.createObjectURL(e.target.files[0]);
      setShopCoverImage(U);
      URL.revokeObjectURL(e.target.files);
    }

    formik.setFieldValue("image", e.currentTarget.files[0]);
  };

  const handleBannerImageChange = (e, formik) => {
    if (e.target.files) {
      const U = URL.createObjectURL(e.target.files[0]);
      setShopBannerImage(U);
      URL.revokeObjectURL(e.target.files);
    }

    formik.setFieldValue("bannerimage", e.currentTarget.files[0]);
  };

  useEffect(() => {
    if (shop) {
      setShopCoverImage(shop.coverimage);
      setShopBannerImage(shop.bannerimage);
      if (shop.open === true) {
        setopen({ checked: true });
      } else {
        setopen({ checked: false });
      }

      if (shop.status === true) {
        setActive({ checked: true });
      } else {
        setActive({ checked: false });
      }
    }
  }, [shop]);

  useLayoutEffect(() => {
    dispatch(listShopDetails(shopId));
    console.log(shop);
  }, [dispatch, shopId]);

  const validate = Yup.object({
    shop_name_en: Yup.string().required("Required"),
    email: Yup.string().email("Email is invalid").required("Email is required"),
    image:
      Yup.mixed().required("required") || Yup.string().required("required"),
    password: Yup.string().required("Required"),
    shop_trn: Yup.string(),
    shop_mob: Yup.string(),
    shop_website: Yup.string(),
    bannerimage:
      Yup.mixed().required("required") || Yup.string().required("required"),
  });

  const validateWithoutPassword = Yup.object({
    shop_name_en: Yup.string().required("Required"),
    email: Yup.string().email("Email is invalid").required("Email is required"),
    image:
      Yup.mixed().required("required") || Yup.string().required("required"),
    shop_trn: Yup.string(),
    shop_mob: Yup.string(),
    shop_website: Yup.string(),
    bannerimage:
      Yup.mixed().required("required") || Yup.string().required("required"),
  });

  const validateform = () => {
    if (shopId) {
      return validateWithoutPassword;
    } else {
      return validate;
    }
  };

  const handleSubmit = async (formdata) => {
    dispatch(createShop(dispatch, formdata));
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo.user.typeofuser === "S") {
      dispatch(listShops(1));
    }
    history.goBack();
  };

  return (
    <>
      {loading || loadingcreate || shoploadingcreate ? (
        <Loader />
      ) : error || errorcreate || shoperrorcreate ? (
        <Message variant="danger">
          {error || errorcreate || shoperrorcreate}
        </Message>
      ) : (
        <Formik
          enableReinitialize
          initialValues={{
            shop_name_en: (shop && shop.shop_name_en) || "",
            email: (shop && shop.shop_email) || "",
            image: (shop && shop.coverimage) || "",
            bannerimage: (shop && shop.bannerimage) || "",
            password: "",
            shop_trn: (shop && shop.shop_trn) || "",
            shop_mob: (shop && shop.shop_mob) || "",
            shop_website: (shop && shop.shop_website) || "",
            open: (shop && shop.open) || "",
            isactive: (shop && shop.false) || "",
            name: (shop && shop.name) || "",
          }}
          validationSchema={validateform}
          onSubmit={(values) => {
            if (checkPermissionOnSubmit("shop.update")) {
              history.push("/error");
              return;
            }

            let formdata = new FormData();

            if (shopId) {
              formdata.append("id", shopId);
            }

            formdata.append("shop_name_en", values.shop_name_en);
            formdata.append("shop_name_ar", values.shop_name_en);
            formdata.append("name_en", values.shop_name_en);
            formdata.append("email", values.email);
            if (typeof values.image === "string") {
              formdata.delete("image");
            } else {
              formdata.append("image", values.image);
            }

            if (typeof values.bannerimage === "string") {
              formdata.delete("banner");
            } else {
              formdata.append("banner", values.bannerimage);
            }

            formdata.append("password", values.password);
            formdata.append("shop_trn", values.shop_trn);
            formdata.append("shop_mob", values.shop_mob);
            formdata.append("shop_website", values.shop_website);
            values.open === true
              ? formdata.append("open", 1)
              : formdata.append("open", 0);

            values.isactive === true
              ? formdata.append("status", 1)
              : formdata.append("status", 0);

            let permissionlsit = {
              product: values.product,
              shop: values.shop,
              category: values.category,
              variations: values.variation,
            };

            permissionlsit = JSON.stringify(permissionlsit);
            formdata.append("add_permission[]", permissionlsit);

            handleSubmit(formdata);
          }}
        >
          {(formik) => (
            <div>
              <Form>
                {shopId ? (
                  <div>
                    <Card
                      className="my-2 p-1 rounded"
                      style={{ height: "280px", objectFit: "cover" }}
                    >
                      <Card.Img
                        style={{ height: "270px", objectFit: "contain" }}
                        src={shopBannerImage}
                        variant="top"
                      />
                    </Card>

                    <div className="d-flex my-2 ">
                      <label className="custom-file-upload w-100">
                        <input
                          type="file"
                          onChange={(e) => handleBannerImageChange(e, formik)}
                          name="bannerimage"
                        />
                        <ErrorMessage
                          component="div"
                          className="error text-danger"
                          name={"bannerimage"}
                        />
                        <i className="bx bx-cloud-upload mx-2"></i>Upload Banner
                        Image
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
                        src={shopBannerImage}
                        variant="top"
                      />
                    </Card>

                    <div className="d-flex my-2 ">
                      <label className="custom-file-upload w-100">
                        <input
                          type="file"
                          onChange={(e) => handleBannerImageChange(e, formik)}
                          name="bannerimage"
                        />
                        <ErrorMessage
                          component="div"
                          className="error text-danger"
                          name={"bannerimage"}
                        />
                        <i className="bx bx-cloud-upload mx-2"></i>Upload Banner
                        Image
                      </label>
                    </div>
                  </div>
                )}
                <div className="row">
                  <div className="col-md-6">
                    {shopId ? (
                      <div>
                        <div className="d-flex justify-content-center">
                          <Image
                            src={shopCoverImage}
                            style={{ height: "270px", objectFit: "contain" }}
                            roundedCircle
                          />
                        </div>
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
                            Cover Image
                          </label>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div className="d-flex justify-content-center">
                          <Image
                            src={shopCoverImage}
                            style={{ height: "270px", objectFit: "contain" }}
                            roundedCircle
                          />
                        </div>

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
                            Cover Image
                          </label>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="col-md-6">
                    <div className="row">
                      <div className="col-md-6">
                        <TextField
                          label="English Name"
                          name="shop_name_en"
                          type="text"
                        />
                      </div>
                      {shopId ? (
                        ""
                      ) : (
                        <div className="col-md-6">
                          <TextField
                            label="Password"
                            name="password"
                            type="password"
                          />
                        </div>
                      )}
                    </div>

                    <div className="row g-3">
                      <div className="col-md-6">
                        <TextField
                          label="Shop TRN"
                          name="shop_trn"
                          type="text"
                        />
                      </div>

                      <Col>
                        <TextField label="Email" name="email" type="text" />
                      </Col>
                    </div>
                    <div className="row g-3">
                      <Col>
                        <TextField
                          label="Shop Website"
                          name="shop_website"
                          type="text"
                        />
                      </Col>
                      <div className="col-md-6">
                        <TextField
                          label="Shop Mob"
                          name="shop_mob"
                          type="text"
                        />
                      </div>
                    </div>
                    <Row>
                      {/*<Col className="col-3">
                        <div class="form-check form-switch">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="flexSwitchCheckDefault"
                            checked={active.checked}
                            onChange={(d) => {
                              active.checked === true
                                ? (d = false)
                                : (d = true);
                              setActive({ checked: d });
                              formik.setFieldValue("isactive", d);
                            }}
                          />
                          <label
                            class="form-check-label"
                            for="flexSwitchCheckDefault"
                          >
                            Active
                          </label>
                        </div>
                          </Col>*/}

                      {
                        <Col className="col-3">
                          <div class="form-check form-switch">
                            <input
                              class="form-check-input"
                              type="checkbox"
                              id="flexSwitchCheckDefault"
                              checked={open.checked}
                              onChange={(d) => {
                                open.checked === true
                                  ? (d = false)
                                  : (d = true);
                                setopen({ checked: d });
                                formik.setFieldValue("open", d);
                              }}
                            />
                            <label
                              class="form-check-label"
                              for="flexSwitchCheckDefault"
                            >
                              Open
                            </label>
                          </div>
                        </Col>
                      }

                      <button
                        className="btn btn-success mt-3 w-100"
                        type="submit"
                      >
                        Save
                      </button>
                    </Row>
                  </div>
                </div>
              </Form>
            </div>
          )}
        </Formik>
      )}
    </>
  );
};

export default AddNewShopScreen;
