import * as actionTypes from "../actions/actionTypes";

const initialState = {
  UserPosts: [],
};

export default function postsReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.GET_USER_POSTS:
      return {
        ...state,
        UserPosts: action.payload,
      };
    default:
      return state;
  }
}
