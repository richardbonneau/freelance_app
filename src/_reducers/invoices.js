import { newEntry } from "../utils/static"
import uniqid from "uniqid";

import {
  GET_INITIAL_INVOICES_LIST,
  PUSH_NEW_INVOICE,
  FIREBASE_SUCCESS,
  FIREBASE_FAILURE,
  OPEN_NEW_INVOICE_PAGE,
  ATTEMPT_PUSHING_NEW_INVOICE,
  PUSH_NEW_ITEM,
  DELETE_ITEM,
  MODIFY_ITEM
} from "../_actions";

let defaultItemsList = [{ ...newEntry, id: uniqid() }];
export default (
  state = {
    isSendingReq: false,
    reqError: false,
    invoicesList: [],
    currentItemsList: defaultItemsList
  },
  action
) => {
  switch (action.type) {
    case GET_INITIAL_INVOICES_LIST:
      return {
        ...state,
        invoicesList: action.invoicesList,
        isSendingReq: true,
        reqError: false,
      }
    case OPEN_NEW_INVOICE_PAGE:
      return {
        ...state,
        currentItemsList: defaultItemsList
      }
    case ATTEMPT_PUSHING_NEW_INVOICE:
      return {
        ...state,
        isSendingReq: true,
        reqError: false,
      }
    case PUSH_NEW_INVOICE:
      return {
        ...state,
        invoicesList: [...state.invoicesList, action.newInvoice],
      }
    case PUSH_NEW_ITEM:
      return {
        ...state,
        currentItemsList: state.currentItemsList.concat({ ...newEntry, id: uniqid() })
      }
    case DELETE_ITEM:
      return {
        ...state,
        currentItemsList: state.currentItemsList.filter((item, i) => action.index !== i)
      }
    case MODIFY_ITEM:
      return {
        ...state,
        currentItemsList: state.currentItemsList.map((item, i) => {
          if (i !== action.index) return item;
          return action.contents;
        })
      }

    case FIREBASE_SUCCESS:
      return {
        ...state,
        isSendingReq: false
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
