import * as actionTypes from "../actions/actionTypes";

const initialState = {
  orderUsers: [],
  orderUserDetail: []
};

export default function ordersUserReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.GET_ORDER_USERS:
      return{
        ...state,
        orderUsers: action.payload
      } 
      case 'ORDER_ID': return{
        ...state,
        orderUserDetail: action.payload
      }
    default:
      return state;
  }
}