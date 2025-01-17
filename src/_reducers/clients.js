import {
  GET_INITIAL_CLIENTS_LIST,
  PUSH_NEW_CLIENT,
  FIREBASE_FAILURE
} from "../_actions";

export default (
  state = {
    isSendingReq: false,
    initialClientsFetch: false,
    reqError: false,
    clientsList: []
  },
  action
) => {
  switch (action.type) {
    case GET_INITIAL_CLIENTS_LIST:
      return {
        ...state,
        clientsList: action.clientsList
      }
    case PUSH_NEW_CLIENT:
      console.log("state.clients", state.clientsList)
      return {
        ...state,
        clientsList: [...state.clientsList, action.newClient]
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
