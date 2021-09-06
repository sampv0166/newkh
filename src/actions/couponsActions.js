import axios from "axios";
import {
  CATEGORY_DELETE_FAIL,
  CATEGORY_DELETE_SUCCESS,
} from "../constants/categoryConstants";
import {
  COUPONS_FAIL,
  COUPONS_REQUEST,
  COUPONS_SUCCESS,
  COUPON_CREATE_FAIL,
  COUPON_CREATE_REQUEST,
  COUPON_CREATE_SUCCESS,
  COUPON_DELETE_REQUEST,
  COUPON_DETAILS_FAIL,
  COUPON_DETAILS_REQUEST,
  COUPON_DETAILS_SUCCESS,
} from "../constants/couponsConstants";
import { BASE_URL } from "../constants/Globals";
import { data1 } from "../jsx/components/charts/Sparkline/NagetivePositive";

export const getCoupons =
  (keyword = "") =>
  async (dispatch) => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.success.token}`,
      },
    };

    try {
      dispatch({ type: COUPONS_REQUEST });

      let resdata;

      if (keyword === "" || keyword === undefined || keyword === null) {
        const { data } = await axios.get(
          `${BASE_URL}api/v2/admin/coupon`,
          config
        );
        resdata = data;
      } else {
        const { data } = await axios.get(
          `${BASE_URL}api/v2/admin/adminsearch?search=${keyword}&type=coupons`,
          config
        );
        resdata = data;
      }

      const data = resdata;

      console.log(data);

      dispatch({
        type: COUPONS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: COUPONS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const listCouponDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: COUPON_DETAILS_REQUEST });

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.success.token}`,
      },
    };

    const { data } = await axios.get(
      `${BASE_URL}api/v2/admin/coupon?id=${id}`,
      config
    );

    dispatch({
      type: COUPON_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: COUPON_DETAILS_FAIL,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.message,
    });
  }
};

export const createCoupon = (dispatch, formdata) => async () => {
  try {
    dispatch({
      type: COUPON_CREATE_REQUEST,
    });

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${userInfo.success.token}`,
      },
    };

    const { data } = await axios.post(
      `${BASE_URL}api/v2/admin/coupon`,
      formdata,
      config
    );

    dispatch({
      type: COUPON_CREATE_SUCCESS,
      payload: data,
    });

    dispatch(getCoupons());
  } catch (error) {
    const message =
      error.response && error.response.data.error
        ? error.response.data.error
        : error.message;
    /*if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }*/
    dispatch({
      type: COUPON_CREATE_FAIL,
      payload: message,
    });
  }
};

export const deleteCoupon = (formdata) => async (dispatch, getState) => {
  try {
    dispatch({
      type: COUPON_DELETE_REQUEST,
    });

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.success.token}`,
      },
    };

    await axios.post(
      `${BASE_URL}api/v2/admin/deletecoupon`,
      formdata,
      config
    );

    dispatch({
      type: CATEGORY_DELETE_SUCCESS,
    });

    dispatch(getCoupons());
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      ///dispatch(logout())
    }
    dispatch({
      type: CATEGORY_DELETE_FAIL,
      payload: message,
    });
  }
};
