import { combineReducers } from "redux";
import Product from "./reducer";

const rootReducer = combineReducers({
  reducer: Product,
});

export default rootReducer;
