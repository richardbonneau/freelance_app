
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  VERIFY_REQUEST,
  VERIFY_SUCCESS,
  VERIFY_FAIL,
  DATABASE_ACCESS,
  DATABASE_FAILURE
} from "../_actions";

export default (
  state = {
    isLoggingIn: false,
    isLoggingOut: false,
    loginError: false,
    logoutError: false,
    isVerifying: false,
    verifyingError: false,
    isManipulatingDatabase: false,
    databaseError: false,
    isAuthenticated: false,
    user: {}
  },
  action
) => {
  console.log("action",action.type)
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        isLoggingIn: true,
        loginError: false
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggingIn: false,
        isAuthenticated: true,
        user: action.user
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        isLoggingIn: false,
        isAuthenticated: false,
        loginError: true
      };
    case LOGOUT_REQUEST:
      return {
        ...state,
        isLoggingOut: true,
        logoutError: false
      }
    case LOGOUT_SUCCESS:
      return {
        ...state,
        isLoggingOut: false,
        isAuthenticated: false,
        user: {}
      }
    case LOGOUT_FAILURE:
      return {
        ...state,
        isLoggingOut: false,
        logoutError: true
      }
    case VERIFY_REQUEST:
      return {
        ...state,
        isVerifying: true,
        verifyingError: false
      }
    case VERIFY_SUCCESS:
      return {
        ...state,
        isVerifying: false
      }
    case VERIFY_FAIL:
      return {
        ...state,
        isVerifying: false
      }
    case DATABASE_ACCESS:
      return {
        ...state,
        isManipulatingDatabase: true
      }
    case DATABASE_FAILURE:
      return {
        
        ...state,
        databaseError: true,
        isManipulatingDatabase: false
      }
    default:
      return state;
  }
};
