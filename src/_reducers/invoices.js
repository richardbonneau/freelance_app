import {
  GET_INITIAL_INVOICES_LIST,
  PUSH_NEW_INVOICE,
  FIREBASE_FAILURE
} from "../_actions";

export default (
  state = {
    isSendingReq: false,
    initialInvoicesFetch: false,
    reqError: false,
    invoices:[]
  },
  action
) => {
  switch (action.type) {
    
    case GET_INITIAL_INVOICES_LIST:
      return {
        ...state,
        invoices: action.invoicesList
      }
    case PUSH_NEW_INVOICE:
      return {
        ...state,
        invoices: [...state.invoices, action.newInvoice]
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
