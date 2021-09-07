import axios from "axios";
import { BASE_URL } from "../constants/Globals";
import {
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  SEARCHED_PRODUCT_FAIL,
  SEARCHED_PRODUCT_REQUEST,
  SEARCHED_PRODUCT_SUCCESS,
  SEARCH_PRODUCT_FAIL,
  SEARCH_PRODUCT_REQUEST,
  SEARCH_PRODUCT_SUCCESS,
} from "../constants/productConstants";
import { createVariation, updateVariation } from "./variationActions";

export const searchProducts = (keyword) => async (dispatch) => {
  try {
    dispatch({ type: SEARCHED_PRODUCT_REQUEST });
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.success.token}`,
      },
    };
    let data2;

    const { data } = await axios.get(
      `${BASE_URL}api/v2/public/searchprodandshops?search=${keyword}`,
      config
    );

    data2 = data.products;

    console.log(data2);

    dispatch({
      type: SEARCHED_PRODUCT_SUCCESS,
      payload: data2,
    });
  } catch (error) {
    dispatch({
      type: SEARCHED_PRODUCT_FAIL,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.message,
    });
  }
};

export const listProducts = (pageNumber, keyword) => async (dispatch) => {
  if (keyword === "" || keyword === undefined || keyword === null) {
    try {
      dispatch({ type: PRODUCT_LIST_REQUEST });
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.success.token}`,
        },
      };
      let data2;

      const { data } = await axios.get(
        `${BASE_URL}api/v2/admin/product?page=${pageNumber}`,
        config
      );

      data2 = data;

      dispatch({
        type: PRODUCT_LIST_SUCCESS,
        payload: data2,
      });
    } catch (error) {
      dispatch({
        type: PRODUCT_LIST_FAIL,
        payload:
          error.response && error.response.data.error
            ? error.response.data.error
            : error.message,
      });
    }
  } else {
    try {
      dispatch({ type: PRODUCT_LIST_REQUEST });
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.success.token}`,
        },
      };

      const { data } = await axios.get(
        `${BASE_URL}api/v2/admin/product?search=${keyword}`,
        config
      );

      dispatch({
        type: PRODUCT_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: PRODUCT_LIST_FAIL,
        payload:
          error.response && error.response.data.error
            ? error.response.data.error
            : error.message,
      });
    }
  }
};

export const listProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.success.token}`,
      },
    };

    const { data } = await axios.get(
      `${BASE_URL}api/v2/admin/product/${id}`,
      config
    );

    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.message,
    });
  }
};

export const createProduct =
  (
    dispatch,
    formdata,
    ProductVariationList,
    hasVariant,
    productId,
    varId,
    values,
    deleteimageurl
  ) =>
  async () => {
    try {
      dispatch({
        type: PRODUCT_CREATE_REQUEST,
      });

      const userInfo = JSON.parse(localStorage.getItem("userInfo"));

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userInfo.success.token}`,
        },
      };

      const { data } = await axios.post(
        `${BASE_URL}api/v2/admin/product`,
        formdata,
        config
      );

      dispatch({
        type: PRODUCT_CREATE_SUCCESS,
        payload: data,
      });

      dispatch(listProducts(1));

      if (!productId) {
        dispatch(
          createVariation(
            dispatch,
            formdata,
            ProductVariationList,
            hasVariant,
            data
          )
        );
      } else {
        if (varId) {
          formdata.set("id", varId);
          formdata.set("product_id", productId);
          formdata.set("price", ProductVariationList[0].price);
          formdata.set("stocks", ProductVariationList[0].stocks);

          ProductVariationList[0].hasoffer === true
            ? formdata.append("hasoffer", 1)
            : formdata.append("hasoffer", 0);

          formdata.set("offerprice", ProductVariationList[0].offerprice);

          for (var i = 0; i < ProductVariationList[0].images.length; i++) {
            if (typeof ProductVariationList[0].images[i] === "string") {
            } else {
              formdata.append(
                `images[${i}]`,
                ProductVariationList[0].images[i]
              );
            }
          }

          dispatch(
            updateVariation(
              dispatch,
              formdata,
              productId,
              deleteimageurl,
              varId
            )
          );
        }
      }
    } catch (error) {
      const message =
        error.response && error.response.data.error
          ? error.response.data.error
          : error.message;
      /*if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }*/
      dispatch({
        type: PRODUCT_CREATE_FAIL,
        payload: message,
      });
    }
  };

export const deleteProduct = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRODUCT_DELETE_REQUEST,
    });

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.success.token}`,
      },
    };

    await axios.delete(`${BASE_URL}api/v2/admin/product/${id}`, config);

    dispatch({
      type: PRODUCT_DELETE_SUCCESS,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.error
        ? error.response.data.error
        : error.message;
    if (message === "Not authorized, token failed") {
      ///dispatch(logout())
    }
    dispatch({
      type: PRODUCT_DELETE_FAIL,
      payload: message,
    });
  }
};
