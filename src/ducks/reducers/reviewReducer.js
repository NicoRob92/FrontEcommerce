import * as actionTypes from "../actions/actionTypes";

const initialState = {
  reviews: [],
  pureReviews: []
};

export default function reviewReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.GET_REVIEW:
      return{
        ...state,
        reviews: action.payload,
        pureReviews: action.payload.Reviews
      } 
      case actionTypes.FILTER_REVIEW:
        const reviews = state.pureReviews
        const sortedReviews = action.payload === 'positive' ? reviews.filter((r) => r.rating >= 3 ) : reviews.filter((r) => r.rating < 3 )
        return{
          ...state,
          reviews: action.payload === 'all' ? reviews : sortedReviews
        } 
    default:
      return state;
  }
}
