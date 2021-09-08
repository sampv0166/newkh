import React, { useEffect } from "react";
import { Card, Col, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { listProductDetails } from "../../actions/productActions";
import { deleteVariation } from "../../actions/variationActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import checkPermission from "./checkpermission";

const VariationTable = ({
  ProductVariationList,
  setProductVariationList,
  hasColor,
  hasSize,
  productId,
  setShowOptions,
  varId,
  setVarId,
  history,
}) => {
  const TableHead = ["ID", "PRICE", "SIZE", "COLOR", " "];

  let altimage;

  const dispatch = useDispatch();
  const handleDeletevariation = async (e, id, i) => {
    e.preventDefault();

    if (productId && ProductVariationList.length === 1) {
      alert("atleast one variation is required");
      return;
    }

    if (productId) {
      if (window.confirm("Are you sure")) {
        let arr;

        arr = ProductVariationList.filter((item, index) => index !== i);
        setProductVariationList(arr);

        dispatch(deleteVariation(id));
      }
    } else {
      let arr;
      arr = ProductVariationList.filter((item, index) => index !== i);
      setProductVariationList(arr);
    }
  };

  const renderVariationImages = (image) => {
    return (
      <span>
        <Card.Img
          style={{
            height: "50px",
            width: "50px",
            objectFit: "contain",
          }}
          src={image}
          variant="top"
        />
      </span>
    );
  };

  const variationCreate = useSelector((state) => state.variationCreate);
  const {
    loading: loadingCreateVariation,
    error: errorCreateVariation,
    success: successCreateVariation,
  } = variationCreate;

  const singleVariationCreate = useSelector(
    (state) => state.singleVariationCreate
  );
  const {
    loading: loadingSingleCreateVariation,
    error: errorSingleCreateVariation,
    success: successSingleCreateVariation,
  } = singleVariationCreate;

  const productDetails = useSelector((state) => state.productDetails);
  const {
    product,
    loading: loadingproductDetails,
    error: errorproductDetails,
    success: successproductDetails,
  } = productDetails;

  useEffect(() => {}, [ProductVariationList, productId]);

  return (
    <>
      {loadingproductDetails ||
      loadingCreateVariation ||
      loadingSingleCreateVariation ? (
        <Loader />
      ) : errorproductDetails ||
        errorCreateVariation ||
        loadingSingleCreateVariation ? (
        <Message>
          {errorproductDetails ||
            errorCreateVariation ||
            loadingSingleCreateVariation}
        </Message>
      ) : (
        <div>
          {ProductVariationList.length > 1 ? (
            <Col lg={12}>
              <div className="col-12 my-5 w-100">
                <Table
                  responsive
                  hover
                  className="header-border verticle-middle"
                >
                  <thead>
                    <tr>
                      <th scope="col">ID</th>
                      {productId ? <th scope="col">IMAGES</th> : ""}

                      <th scope="col">PRICE</th>
                      {!hasSize.checked ? "" : <th scope="col">SIZE</th>}
                      {!hasColor.checked ? "" : <th scope="col">COLOR</th>}
                      <th scope="col" className="d-flex justify-content-center">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {ProductVariationList.length > 0
                      ? ProductVariationList.map((item, index) => (
                          <tr key={index}>
                            <td>{index}</td>

                            {productId ? (
                              <td>
                                {item.images.map((image) => {
                                  if (
                                    image ===
                                    "https://khaymatapi.mvp-apps.ae/storage/"
                                  ) {
                                  } else {
                                    return renderVariationImages(image);
                                  }
                                })}
                              </td>
                            ) : (
                              ""
                            )}

                            <td>{item.price}</td>

                            {!hasSize.checked ? "" : <td>{item.size_value}</td>}

                            {!hasColor.checked ? (
                              ""
                            ) : (
                              <td>{item.color_name}</td>
                            )}

                            <td>
                              <div className="d-flex justify-content-around">
                                <i
                                  className="fa fa-trash"
                                  style={{
                                    cursor: "pointer",
                                    color: "red",
                                  }}
                                  onClick={(e) => {
                                    checkPermission(
                                      history,
                                      "variation.delete"
                                    );
                                    handleDeletevariation(e, item.id, index);
                                  }}
                                ></i>

                                {productId ? (
                                  <i
                                    className="fa fa-pencil"
                                    style={{
                                      cursor: "pointer",
                                      color: "blue",
                                    }}
                                    onClick={() => {
                                      checkPermission(
                                        history,
                                        "variation.update"
                                      );
                                      dispatch(listProductDetails(productId));
                                      setShowOptions(true);
                                      setVarId(item.id);
                                    }}
                                  ></i>
                                ) : (
                                  ""
                                )}
                              </div>
                            </td>
                          </tr>
                        ))
                      : ""}
                  </tbody>
                </Table>
              </div>
            </Col>
          ) : (
            ""
          )}
        </div>
      )}
    </>
  );
};

export default VariationTable;
