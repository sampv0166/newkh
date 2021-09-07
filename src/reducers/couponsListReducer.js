import {
  COUPONS_FAIL,
  COUPONS_REQUEST,
  COUPONS_SUCCESS,
  COUPON_CREATE_FAIL,
  COUPON_CREATE_REQUEST,
  COUPON_CREATE_SUCCESS,
  COUPON_DELETE_FAIL,
  COUPON_DELETE_REQUEST,
  COUPON_DELETE_SUCCESS,
  COUPON_DETAILS_FAIL,
  COUPON_DETAILS_REQUEST,
  COUPON_DETAILS_SUCCESS,
} from "../constants/couponsConstants";

export const couponsListReducer = (state = { coupons: [] }, action) => {
  switch (action.type) {
    case COUPONS_REQUEST:
      return { loading: true, coupons: [] };
    case COUPONS_SUCCESS:
      return {
        loading: false,
        coupons: action.payload.data,
      };
    case COUPONS_FAIL:
      return { loading: false, couponsError: action.payload };
    default:
      return state;
  }
};

export const couponDetailsReducer = (state = { coupon: [] }, action) => {
  switch (action.type) {
    case COUPON_DETAILS_REQUEST:
      return { loading: true, coupon: [] };
    case COUPON_DETAILS_SUCCESS:
      return {
        loading: false,
        coupon: action.payload,
      };
    case COUPON_DETAILS_FAIL:
      return { loading: false, couponError: action.payload };
    default:
      return state;
  }
};

export const couponCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case COUPON_CREATE_REQUEST:
      return { loading: true };
    case COUPON_CREATE_SUCCESS:
      return { loading: false, success: true, coupon: action.payload };
    case COUPON_CREATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const couponDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case COUPON_DELETE_REQUEST:
      return { loading: true };
    case COUPON_DELETE_SUCCESS:
      return { loading: false, success: true };
    case COUPON_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
