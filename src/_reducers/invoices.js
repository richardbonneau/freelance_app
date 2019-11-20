import {
  GET_INITIAL_CLIENTS_LIST,
  INITIAL_CLIENTS_SUCCESS,
  PUSH_NEW_CLIENT,
  FIREBASE_FAILURE
} from "../_actions";

export default (
  state = {
    isSendingReq: false,
    initialClientsFetch: false,
    reqError: false,
    clients:[]
  },
  action
) => {
  switch (action.type) {
    // case INITIAL_CLIENTS_REQUEST:
    //   return {
    //     ...state,
    //     isSendingReq: true,
    //     reqError: false
    //   };
    // case INITIAL_CLIENTS_SUCCESS:
    //   return {
    //     ...state,
    //     isSendingReq: false,
    //     initialClientsFetch: true,
    //   };
    case GET_INITIAL_CLIENTS_LIST:
      return {
        ...state,
        clients: action.clientsList
      }
    case PUSH_NEW_CLIENT:
      return {
        ...state,
        clients: [...state.clients, action.newClient]
      }
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
