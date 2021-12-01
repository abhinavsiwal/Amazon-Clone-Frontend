import {
  ALL_PRODUCTS_REQUEST,
  ALL_PRODUCTS_SUCCESS,
  ALL_PRODUCTS_FAIL,
  PRODUCT_DETAIL_REQUEST,
  PRODUCT_DETAIL_SUCCESS,
  PRODUCT_DETAIL_FAIL,
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_SUCCESS,
  NEW_REVIEW_RESET,
  NEW_REVIEW_FAILED,
  CLEAR_ERRORS,
} from "../../constants/productConstants";

export const productReducers = (state = { products: [] }, action) => {
  switch (action.type) {
    case ALL_PRODUCTS_REQUEST:
      return {
        loading: true,
        products: [],
      };
    case ALL_PRODUCTS_SUCCESS:
      return {
        loading: false,
        products: action.payload.products,
        productsCount: action.payload.productsCount,
        resPerPage:action.payload.resPerPage,
        filteredProductsCount:action.payload.filteredProductsCount
      };
    case ALL_PRODUCTS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const productDetailReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case PRODUCT_DETAIL_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case PRODUCT_DETAIL_SUCCESS:
      return {
        loading:false,
        product:action.payload,
      };
    case PRODUCT_DETAIL_FAIL:
      return {
        ...state,
        error:action.payload,
      };
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
    default:
      return state;
  }
};

export const newReviewReducer = (state ={}, action) => {
  switch (action.type) {
    case NEW_REVIEW_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case NEW_REVIEW_SUCCESS:
      return {
        loading:false,
        success:action.payload,
      };
    case NEW_REVIEW_FAILED:
      return {
        ...state,
        error:action.payload,
      };

    case NEW_REVIEW_RESET:
      return {
        ...state,
        success:false,
      }
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
    default:
      return state;
  }
};
