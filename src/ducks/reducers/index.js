import { combineReducers } from "redux";
import Product from "./reducer";
import reviewReducer from './reviewReducer'
import userReducer from "./userReducer";
import ordersUserReducer from "./ordersUserReducer";
import postsReducer from "./postsReducer";

const rootReducer = combineReducers({
  reducer: Product,
  review: reviewReducer,
  user: userReducer,
  orderUser: ordersUserReducer,
  posts: postsReducer
});

export default rootReducer;
