import {
  CLIENTS_REQUEST,
  CLIENTS_SUCCESS,
  CLIENTS_FAILURE
} from "../_actions";

export default (
  state = {
    isSendingReq: false,
    reqError: false
  },
  action
) => {
  switch (action.type) {
    case CLIENTS_REQUEST:
      return {
        ...state,
        isSendingReq: true,
        reqError: false
      };
    case CLIENTS_SUCCESS:
      return {
        ...state,
        isSendingReq: false
      };
    case CLIENTS_FAILURE:
      return {
        ...state,
        isSendingReq: false,
        reqError: true
      };
    default:
      return state;
  }
};
