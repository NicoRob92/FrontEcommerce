import * as actionTypes from "../actions/actionTypes";

const initialState = {
  user: []
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.GET_USER_BY_ID:
      return{
        ...state,
        user: action.payload
      }  
    default:
      return state;
  }
}
