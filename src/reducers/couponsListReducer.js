import {
  COUPONS_FAIL,
  COUPONS_REQUEST,
  COUPONS_SUCCESS,
} from "../constants/couponsConstants";

export const couponsListReducer = (state = { coupons: [] }, action) => {
  switch (action.type) {
    case COUPONS_REQUEST:
      return { loading: true, coupons: [] };
    case COUPONS_SUCCESS:
      return {
        loading: false,
        coupons: action.payload,
      };
    case COUPONS_FAIL:
      return { loading: false, couponsError: action.payload };
    default:
      return state;
  }
};
