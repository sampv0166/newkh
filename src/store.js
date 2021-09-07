import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  createUserReducer,
  userDeleteReducer,
  userDetailsReducer,
  userListReducer,
  userLoginReducer,
  userRegisterReducer,
} from "./reducers/userReducers";
import {
  productCreateReducer,
  productDeleteReducer,
  productDetailsReducer,
  productListReducer,
  productUpdateReducer,
  searchedProductsReducer,
  searchProductReducer,
} from "./reducers/productReducers";
import {
  categoryCreateReducer,
  categoryDeleteReducer,
  categoryDetailsReducer,
  categoryListReducer,
  categoryReducer,
} from "./reducers/categoryReducer";
import {
  allShopReducer,
  shopCreateReducer,
  shopDeleteReducer,
  shopDetailsReducer,
  shopReducer,
} from "./reducers/shopReducer";
import {
  addVariationImageReducer,
  singleVariationCreateReducer,
  variationCreateReducer,
  variationDeleteReducer,
  variationImageDeleteReducer,
  variationUpdateReducer,
} from "./reducers/variationReducer";
import {
  orderDetailsListReducer,
  orderListReducer,
  orderStatusUpdateReducer,
} from "./reducers/orderReducers";
import { createPermissionReducer } from "./reducers/PermissionsReducer";
import { hasvariantReducer } from "./reducers/hasVariantReducer";
import {
  couponCreateReducer,
  couponDeleteReducer,
  couponDetailsReducer,
  couponsListReducer,
} from "./reducers/couponsListReducer";
import {
  sliderCreateReducer,
  sliderDeleteReducer,
  sliderDetailsReducer,
  sliderListReducer,
} from "./reducers/sliderReducers";

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  productDelete: productDeleteReducer,
  searchProducts: searchProductReducer,
  userLogin: userLoginReducer,

  shopList: shopReducer,
  shopListDetails: shopDetailsReducer,
  shopDelete: shopDeleteReducer,
  shopCreate: shopCreateReducer,
  allshops: allShopReducer,

  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  searchedProducts: searchedProductsReducer,

  variationCreate: variationCreateReducer,
  variationDelete: variationDeleteReducer,
  variationUpdate: variationUpdateReducer,
  variationImageDelete: variationImageDeleteReducer,
  singleVariationCreate: singleVariationCreateReducer,
  addVariationImage: addVariationImageReducer,

  orderList: orderListReducer,
  orderDetailsList: orderDetailsListReducer,
  orderStatusUpdate: orderStatusUpdateReducer,

  userRegister: userRegisterReducer,

  categoryCreate: categoryCreateReducer,
  categoryList: categoryListReducer,
  categoryDetails: categoryDetailsReducer,
  categoryDelete: categoryDeleteReducer,

  userCreate: createUserReducer,
  userList: userListReducer,
  userDetails: userDetailsReducer,
  userDelete: userDeleteReducer,

  permissionCreate: createPermissionReducer,
  hasvariant: hasvariantReducer,

  couponsList: couponsListReducer,
  couponDetails: couponDetailsReducer,
  couponCreate: couponCreateReducer,
  couponDelete: couponDeleteReducer,

  sliderList: sliderListReducer,
  sliderDetails: sliderDetailsReducer,
  sliderCreate: sliderCreateReducer,
  sliderDelete: sliderDeleteReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const hasVariantFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
  hasvariant: { hasVariantFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
