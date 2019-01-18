import * as actionTypes from '../actions/actionTypes';

const initialState = {
  loading: false,
  authenticated: false,
  token: '',
  userId: '',
  messages: []
};

const signupStart = (state, action) => {
  return {
    ...state,
    loading: true
  };
};

const signupSuccess = (state, action) => {
  return {
    ...state,
    authenticated: true,
    token: action.payload.token,
    loading: false
  };
};

const signupFail = (state, action) => {
  return {
    ...state,
    loading: false,
    messages: action.payload.messages
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SIGNUP_START:
      return signupStart(state, action);
    case actionTypes.SIGNUP_SUCCESS:
      return signupSuccess(state, action);
    case actionTypes.SIGNUP_FAIL:
      return signupFail(state, action);
    default:
      return state;
  }
};

export default reducer;
