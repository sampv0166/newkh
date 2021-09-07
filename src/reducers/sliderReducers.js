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

export const sliderListReducer = (state = { sliders: [] }, action) => {
  switch (action.type) {
    case SLIDER_REQUEST:
      return { loading: true, sliders: [] };
    case SLIDER_SUCCESS:
      return {
        loading: false,
        sliders: action.payload,
      };
    case SLIDER_FAIL:
      return { loading: false, slidersError: action.payload };
    default:
      return state;
  }
};

export const sliderDetailsReducer = (
  state = { categoryDetails: [] },
  action
) => {
  switch (action.type) {
    case SLIDER_DETAILS_REQUEST:
      return { loading: true, sliderDetails: [] };
    case SLIDER_DETAILS_SUCCESS:
      return {
        loading: false,
        sliderDetails: action.payload,
      };
    case SLIDER_DETAILS_FAIL:
      if (action.payload === "Category is not found") {
        return {
          loading: false,
          error: "",
        };
      } else {
        return {
          loading: false,
          error: action.payload,
        };
      }

    default:
      return state;
  }
};

export const sliderCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case SLIDER_CREATE_REQUEST:
      return { loading: true };
    case SLIDER_CREATE_SUCCESS:
      return { loading: false, success: true, slider: action.payload };
    case SLIDER_CREATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const sliderDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case SLIDER_DELETE_REQUEST:
      return { loading: true };
    case SLIDER_DELETE_SUCCESS:
      return { loading: false, success: true };
    case SLIDER_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
