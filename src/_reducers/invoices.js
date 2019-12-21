import {newEntry} from "../utils/static"
import uniqid from "uniqid";

import {
  GET_INITIAL_INVOICES_LIST,
  PUSH_NEW_INVOICE,
  FIREBASE_SUCCESS,
  FIREBASE_FAILURE,
  ATTEMPT_PUSHING_NEW_INVOICE,
  PUSH_NEW_ITEM,
  DELETE_ITEM,
  MODIFY_ITEM
} from "../_actions";

export default (
  state = {
    isSendingReq: false,
    reqError: false,
    invoicesList:[],
    currentItemsList:[{...newEntry, id:uniqid()}]
  },
  action
) => {
  switch (action.type) {
    case GET_INITIAL_INVOICES_LIST:
      return {
        ...state,
        invoicesList: action.invoicesList,
        isSendingReq:true,
        reqError: false,
      }
    case ATTEMPT_PUSHING_NEW_INVOICE:
      return {
        ...state,
        isSendingReq:true,
        reqError: false,
      }
    case PUSH_NEW_INVOICE:
      return {
        ...state,
        invoicesList: [...state.invoicesList, action.newInvoice],
      }
    case PUSH_NEW_ITEM:
      let newItem = {...newEntry, id:uniqid()}
      console.log("newitem",newItem)
      return {
        ...state,
        currentItemsList: state.currentItemsList.concat(newItem)
      }
    case DELETE_ITEM:
      return {
        ...state,
        currentItemsList:state.currentItemsList.filter((item,i)=>{
          console.log("action.index !== i",action.index ,"!==", i,action.index !== i)
          return action.index !== i})
      }
    case MODIFY_ITEM:
      return {
        ...state,
        currentItemsList:state.currentItemsList.map((item,i)=>{
          if(i!==action.index) return item;
          return action.contents;
        })
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
