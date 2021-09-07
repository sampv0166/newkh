import React from "react";
import { useLayoutEffect } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createCategory,
  getCategory,
  listCategoryDetails,
} from "../../actions/categoryActions";
import * as Yup from "yup";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { ErrorMessage, Form, Formik } from "formik";
import { Card, Col } from "react-bootstrap";
import TextField from "../components/TextField";
import checkPermission, { checkPermissionOnSubmit } from "./checkpermission";
import {
  createSlider,
  getSlider,
  listSliderDetails,
} from "../../actions/sliderActions";
import { listProducts } from "../../actions/productActions";
import Select from "react-select";

const AddNewSliderScreen = ({ match, history }) => {
  const [sliderImage, setSliderImage] = useState([]);
  const [top, setTop] = useState({ checked: false });
  const [bottom, setBottom] = useState({ checked: false });

  const sliderId = match.params.id;

  const sliderDetails = useSelector((state) => state.sliderDetails);
  const { loading, error, sliderDetails: slider } = sliderDetails;

  const [selectedOption, setSelectedOption] = useState("");

  const productList = useSelector((state) => state.productList);
  const {
    loading: productloading,
    error: producterror,
    products,
    page,
    pages,
  } = productList;

  const categoryList = useSelector((state) => state.categoryList);
  const { loading: loadingCategory, categoryError, category } = categoryList;

  const populateOptions = () => {
    let objects = [products.length];
    for (var x = 0; x < products.length; x++) {
      objects[x] = { value: products[x].id, label: products[x].name_en };
    }
    console.log(objects);

    return objects;
  };

  const populatecategoryOptions = () => {
    let objects = [category.length];
    for (var x = 0; x < category.length; x++) {
      objects[x] = { value: category[x].id, label: category[x].name };
    }
    console.log(objects);

    return objects;
  };

  const sliderCreate = useSelector((state) => state.sliderCreate);
  const { loading: loadingcreate, error: errorcreate } = sliderCreate;

  const dispatch = useDispatch();

  const handleImageChange = (e, formik) => {
    if (e.target.files) {
      const U = URL.createObjectURL(e.target.files[0]);
      setSliderImage(U);
      URL.revokeObjectURL(e.target.files);
    }

    formik.setFieldValue("image", e.currentTarget.files[0]);
  };

  useEffect(() => {
    if (slider) {
      setSliderImage(slider.fullurl);
      if (slider.location === "top") {
        setTop({ checked: true });
      } else {
        setTop({ checked: false });
      }
      if (slider.location === "bottom") {
        setBottom({ checked: true });
      } else {
        setBottom({ checked: false });
      }
    }
  }, [slider]);

  useLayoutEffect(() => {
    //checkPermission(history, "category.add");
    dispatch(listProducts);
    dispatch(getCategory());
    dispatch(listSliderDetails(sliderId));
    populateOptions();
  }, [dispatch, sliderId]);

  const validate = Yup.object({
    location: Yup.string()
      .min(1, "Name must be atleast one character")
      .required("Required"),
    aspectratio: Yup.number().required("Required"),
    image:
      Yup.mixed().required("required") || Yup.string().required("required"),
  });

  const handleSubmit = async (formdata) => {
    dispatch(createSlider(dispatch, formdata));

    dispatch(getSlider());
    history.push("/sliders");
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
            location: (slider && slider.location) || "",
            aspectratio: (slider && slider.aspectratio) || "",
            image: (slider && slider.fullurl) || "",
            shop_id: (slider && slider.shop_id) || "",
            product_id: (slider && slider.pid) || "",
          }}
          validationSchema={validate}
          onSubmit={(values) => {
            /*if (categoryId) {
              if (checkPermissionOnSubmit("category.update")) {
                history.push("/error");
                return;
              }
            }*/

            let formdata = new FormData();

            if (sliderId) {
              formdata.append("id", sliderId);
            }

            formdata.append("location", values.location);
            formdata.append("aspectratio", values.aspectratio);

            formdata.append("location", values.location);

            if (typeof values.image === "string") {
              formdata.delete("file");
            } else {
              formdata.append("file", values.image);
            }

            formdata.append("pid", values.product_id);
            formdata.append("shop_id", values.shop_id);

            handleSubmit(formdata);
          }}
        >
          {(formik) => (
            <div className="row">
              <div className="col-md-12">
                {sliderId ? (
                  <div>
                    <Card
                      className="my-2 p-1 rounded"
                      style={{ height: "280px", objectFit: "cover" }}
                    >
                      <Card.Img
                        style={{ height: "270px", objectFit: "contain" }}
                        src={sliderImage}
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
                        <i className="bx bx-cloud-upload mx-2"></i>Upload Slider
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
                        src={sliderImage}
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
                        <i className="bx bx-cloud-upload mx-2"></i>Upload Slider
                        Image
                      </label>
                    </div>
                  </div>
                )}
              </div>

              <div className="col-md-12">
                <Form>
                  <div className="row g-3">
                    <div className="col-md-4">
                      <TextField
                        label="Aspect Ratio"
                        name="aspectratio"
                        type="number"
                      />
                    </div>
                    {/*<option value="">Select a state...</option>*/}
                    <div className="col-md-4 h-auto">
                      <label>Link To Product</label>
                      <Select
                        options={populateOptions()}
                        name="pid"
                        placeholder="Search Product"
                        onChange={(e) => {
                          formik.setFieldValue("product_id", e.value);
                        }}
                      />
                    </div>

                    <div className="col-md-4">
                      <label>Link To Shop</label>
                      <Select
                        options={populatecategoryOptions()}
                        name="shop_id"
                        placeholder="Search Shop"
                        onChange={(e) => {
                          formik.setFieldValue("shop_id", e.value);
                        }}
                        isLoading="true"
                      />
                    </div>
                  </div>

                  <div class="form-check form-switch">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="flexSwitchCheckDefault"
                      checked={top.checked}
                      onChange={(d) => {
                        if (top.checked === true) {
                          d = false;
                          formik.setFieldValue("location", "bottom");
                          setBottom({ checked: true });
                          setTop({ checked: false });
                        } else {
                          d = true;
                          formik.setFieldValue("location", "top");
                          setBottom({ checked: false });
                          setTop({ checked: true });
                        }
                      }}
                    />
                    <label
                      class="form-check-label"
                      for="flexSwitchCheckDefault"
                    >
                      Top
                    </label>
                  </div>

                  <div class="form-check form-switch">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="flexSwitchCheckDefault"
                      checked={bottom.checked}
                      onChange={(d) => {
                        if (bottom.checked === true) {
                          d = false;
                          formik.setFieldValue("location", "top");
                          setBottom({ checked: false });
                          setTop({ checked: true });
                        } else {
                          d = true;
                          formik.setFieldValue("location", "bottom");
                          setBottom({ checked: true });
                          setTop({ checked: false });
                        }
                      }}
                    />
                    <label
                      class="form-check-label"
                      for="flexSwitchCheckDefault"
                    >
                      Bottom
                    </label>
                  </div>
                  <button className="btn btn-success mt-3 my-2" type="submit">
                    Save
                  </button>
                </Form>
              </div>
            </div>
          )}
        </Formik>
      )}
    </>
  );
};

export default AddNewSliderScreen;
