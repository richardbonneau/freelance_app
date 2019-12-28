import {
    GET_INITIAL_USER_INFO,
    EDIT_USER_INFO,
    FIREBASE_FAILURE
  } from "../_actions";
  
  export default (
    state = {
      userInfo:{}
    },
    action
  ) => {
    switch (action.type) {
      case GET_INITIAL_USER_INFO:
        return {
          ...state,
          userInfo: action.userInfo
        }
    //   case PUSH_NEW_CLIENT:
    //     console.log("state.clients",state.clientsList)
    //     return {
    //       ...state,
    //       clientsList: [...state.clientsList, action.newClient]
    //     }
      case FIREBASE_FAILURE:
        return {
          ...state,
          isSendingReq: false,
          reqError: true
        };
      default:
        return state;
    }
  };
  