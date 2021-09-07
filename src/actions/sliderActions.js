import axios from "axios";
import { BASE_URL } from "../constants/Globals";
import {
  SLIDER_CREATE_FAIL,
  SLIDER_CREATE_REQUEST,
  SLIDER_CREATE_SUCCESS,
  SLIDER_DELETE_FAIL,
  SLIDER_DELETE_REQUEST,
  SLIDER_DELETE_SUCCESS,
  SLIDER_DETAILS_FAIL,
  SLIDER_DETAILS_REQUEST,
  SLIDER_DETAILS_SUCCESS,
  SLIDER_FAIL,
  SLIDER_REQUEST,
  SLIDER_SUCCESS,
} from "../constants/sliderConstants";

export const getSlider =
  (keyword = "") =>
  async (dispatch) => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.success.token}`,
      },
    };

    try {
      dispatch({ type: SLIDER_REQUEST });

      let resdata;

      if (keyword === "" || keyword === undefined || keyword === null) {
        const { data } = await axios.get(`${BASE_URL}api/v2/admin/slider`);
        resdata = data;
      } else {
        const { data } = await axios.get(
          `${BASE_URL}api/v2/admin/adminsearch?search=${keyword}&type=categories`,
          config
        );
        resdata = data;
      }

      const data = resdata;

      console.log(data);

      dispatch({
        type: SLIDER_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: SLIDER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const listSliderDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: SLIDER_DETAILS_REQUEST });

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.success.token}`,
      },
    };

    const { data } = await axios.get(
      `${BASE_URL}api/v2/admin/slider?id=${id}`,
      config
    );

    dispatch({
      type: SLIDER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SLIDER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.message,
    });
  }
};

export const createSlider = (dispatch, formdata) => async () => {
  try {
    dispatch({
      type: SLIDER_CREATE_REQUEST,
    });

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${userInfo.success.token}`,
      },
    };

    const { data } = await axios.post(
      `${BASE_URL}api/v2/admin/slider`,
      formdata,
      config
    );

    dispatch({
      type: SLIDER_CREATE_SUCCESS,
      payload: data,
    });

    dispatch(getSlider());
  } catch (error) {
    const message =
      error.response && error.response.data.error
        ? error.response.data.error
        : error.message;
    /*if (message === 'Not authorized, token failed') {
        dispatch(logout())
      }*/
    dispatch({
      type: SLIDER_CREATE_FAIL,
      payload: message,
    });
  }
};

export const deleteSlider = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SLIDER_DELETE_REQUEST,
    });

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.success.token}`,
      },
    };

    await axios.get(
      `${BASE_URL}api/v2/admin/slider?id=${id}&delete=1`,
      config
    );

    dispatch({
      type: SLIDER_DELETE_SUCCESS,
    });

    dispatch(getSlider());
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      ///dispatch(logout())
    }
    dispatch({
      type: SLIDER_DELETE_FAIL,
      payload: message,
    });
  }
};
