import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";
import {
  productReducer,
  productDetailsReducer,
} from "./reducers/productReducer";
import { userReducer } from "./reducers/userReducer";

const reducer = combineReducers({
  productReducer,
  productDetailsReducer,
  userReducer,
});
let initialState = {};

let middleware = [thunk];
const Store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default Store;
