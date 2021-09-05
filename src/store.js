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
import { couponsListReducer } from "./reducers/couponsListReducer";

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
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
  hasvariant: false,
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
