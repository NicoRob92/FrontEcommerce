import { combineReducers } from "redux";
import Product from "./reducer";
import reviewReducer from './reviewReducer'
import userReducer from "./userReducer";
import ordersUserReducer from "./ordersUserReducer";

const rootReducer = combineReducers({
  reducer: Product,
  review: reviewReducer,
  user: userReducer,
  orderUser: ordersUserReducer
});

export default rootReducer;
