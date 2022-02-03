import { combineReducers } from "redux";
import Product from "./reducer";
import reviewReducer from './reviewReducer'
const rootReducer = combineReducers({
  reducer: Product,
  review: reviewReducer
});

export default rootReducer;
