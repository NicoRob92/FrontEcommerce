import * as actionTypes from "../actions/actionTypes";

const initialState = {
  posts: [],
  postsByName: [],
  categories: [],
  chosenCategories: [],
  categoryPost: [],
  cart: [],
  users: [],
  countries: [],
  filteredPostsByCategory: [],
  postById: [],
  orders: [],
  reviews: [],
};

export default function Product(state = initialState, action) {
  switch (action.type) {
    case actionTypes.GET_POSTS:
      return {
        ...state,
        posts: action.payload,
      };
    case actionTypes.GET_POSTS_BY_NAME:
      return {
        ...state,
        postsByName: action.payload,
      };
    case actionTypes.GET_CATEGORIES:
      return { ...state, categories: action.payload };
    case actionTypes.GET_USERS:
      return { ...state, users: action.payload };

    case actionTypes.GET_COUNTRIES:
      return { ...state, countries: action.payload };

    case actionTypes.GET_CATEGORY_POST:
      return {
        ...state,
        categoryPost: state.posts.filter(
          (post) => post.categoryId === action.payload
        ),
      };
    case actionTypes.GET_POST_BY_ID:
      return {
        ...state,
        postById: action.payload,
      };

    case actionTypes.CHOOSE_CATEGORIES:
      if (action.info === "add") {
        return {
          ...state,
          chosenCategories: [...state.chosenCategories, action.payload],
        };
      } else if (action.info === "remove") {
        return {
          ...state,
          chosenCategories: state.chosenCategories.filter((e, i) => i !== action.index),
        };
      }
      break;
    case actionTypes.RESET_CATEGORIES:
      return {
        ...state,
        chosenCategories: [],
        filteredPostsByCategory: [],
      };
    case actionTypes.FILTER_POSTS_BY_CATEGORY:
      if (action.info === "market") {
        const categoriesInOrder = state.chosenCategories.sort();
        return {
          ...state,
          filteredPostsByCategory: state.posts.filter((post) => {
            if (
              categoriesInOrder
                .toString()
                .includes(String(post.Categories[0].id))
            )
              return true;
            else return false;
          }),
        };
      }
      if (action.info === "search") {
        const categoriesInOrder = state.chosenCategories.sort();
        return {
          ...state,
          filteredPostsByCategory: state.postsByName.filter((post) => {
            let categories = post.Categories;
            categories = categories.map((category) => category.id);
            categories = categories.sort((a, b) => a - b);
            if (
              categoriesInOrder.toString().includes(categories.toString())
            )
              return true;
            else return false;
          }),
        };
      }

    case actionTypes.SET_CART:
      return {
        ...state,
        cart: action.payload,
      };
    case actionTypes.GET_ORDERS:
      return {
        ...state,
        orders: action.payload,
      };
    case actionTypes.SORT_ORDERS:
      const orders = state.orders;
      const sortedOrder =
        action.payload === "all"
          ? orders
          : state.orders.filter((e) => e.status === action.payload);
      return {
        ...state,
        orders: sortedOrder,
      };
    case actionTypes.CREATE_POST:
      return {
        ...state,
        postById: action.payload,
      };

    default:
      return state;
  }
}
