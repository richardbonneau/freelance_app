import {
  GET_INITIAL_INVOICES_LIST,
  PUSH_NEW_INVOICE,
  FIREBASE_SUCCESS,
  FIREBASE_FAILURE
} from "../_actions";

export default (
  state = {
    isSendingReq: false,
    reqError: false,
    invoices:[]
  },
  action
) => {
  switch (action.type) {
    
    case GET_INITIAL_INVOICES_LIST:
      return {
        ...state,
        invoices: action.invoicesList,
        isSendingReq:true,
        reqError: false,
      }
    case PUSH_NEW_INVOICE:
      return {
        ...state,
        invoices: [...state.invoices, action.newInvoice],
        isSendingReq:true,
        reqError: false,
      }
    case FIREBASE_SUCCESS:
      return {
        ...state,
        isSendingReq:false
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
