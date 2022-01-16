import actionTypes from "../actions/actionTypes";

const initialState = {
  isLoading: false,
  arrRoles: [],
  users: [],
};

const adminReduxReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_ROLE_START:
      let copyState = { ...state };
      copyState.isLoading = true;
      return {
        ...copyState,
      };
    case actionTypes.FETCH_ROLE_SUCCESS:
      state.arrRoles = action.data;
      state.isLoading = false;
      return {
        ...state,
      };
    case actionTypes.FETCH_ROLE_FAIL:
      state.isLoading = true;
      state.arrRoles = [];
      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_USER_SUCCESS:
      state.users = action.data;
      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_USER_FAIL:
      state.users = [];
      return {
        ...state,
      };

    default:
      return state;
  }
};

export default adminReduxReducer;
