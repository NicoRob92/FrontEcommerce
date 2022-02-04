import { combineReducers } from "redux";
import Product from "./reducer";
import reviewReducer from './reviewReducer'
import userReducer from "./userReducer";
const rootReducer = combineReducers({
  reducer: Product,
  review: reviewReducer,
  user: userReducer
});

export default rootReducer;
