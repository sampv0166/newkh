import axios from "axios";
import {
  COUPONS_FAIL,
  COUPONS_REQUEST,
  COUPONS_SUCCESS,
} from "../constants/couponsConstants";
import { BASE_URL } from "../constants/Globals";

export const getCoupons = (keyword) => async (dispatch) => {
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
      const { data } = await axios.get(`${BASE_URL}api/v2/public/coupons`);
      resdata = data;
    } else {
      const { data } = await axios.get(
        `${BASE_URL}api/v2/admin/adminsearch?search=${keyword}&type=coupons`,
        config
      );
      resdata = data;
    }

    const data = resdata;

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
