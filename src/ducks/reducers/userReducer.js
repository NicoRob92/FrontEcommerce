import * as actionTypes from "../actions/actionTypes";

const initialState = {
  user: [],
  name: ''
};

export default function userReducer(state = initialState, action) {
  // console.log(initialState.name)
  switch (action.type) {
    case actionTypes.GET_USER_BY_ID:
      return{
        ...state,
        user: action.payload
      } 
      case 'SETNAME':
      return {
        ...state,name: action.payload
      }
      default:
      return state;
  }
}
