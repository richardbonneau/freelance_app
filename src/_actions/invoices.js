import { firestore, db } from "../utils/fire.js";
import store from "../store";

export const OPEN_NEW_INVOICE_PAGE = "OPEN_NEW_INVOICE_PAGE";
export const GET_INITIAL_INVOICES_LIST = "GET_INITIAL_INVOICES_LIST";
export const PUSH_NEW_INVOICE = "PUSH_NEW_INVOICE";
export const INVOICE_PUSH_SUCCESS = "INVOICE_PUSH_SUCCESS";
export const FIREBASE_FAILURE = "FIREBASE_FAILURE";
export const FIREBASE_SUCCESS = "FIREBASE_SUCCESS";
export const ATTEMPT_PUSHING_NEW_INVOICE = "ATTEMPT_PUSHING_NEW_INVOICE";
export const PUSH_NEW_ITEM = "PUSH_NEW_ITEM";
export const DELETE_ITEM = "DELETE_ITEM";
export const MODIFY_ITEM = "MODIFY_ITEM";

const clearAllItems = () => {
  console.log("2");
  return {
    type: OPEN_NEW_INVOICE_PAGE
  };
};
const getInitalInvoicesList = invoicesList => {
  return {
    type: GET_INITIAL_INVOICES_LIST,
    invoicesList
  };
};
const pushNewInvoice = newInvoice => {
  return {
    type: PUSH_NEW_INVOICE,
    newInvoice
  };
};
const attemptPushNewInvoice = () => {
  return {
    type: ATTEMPT_PUSHING_NEW_INVOICE
  };
};
const pushNewItem = () => {
  return {
    type: PUSH_NEW_ITEM
  };
};
const deleteItem = index => {
  return {
    type: DELETE_ITEM,
    index
  };
};

const modifyItem = (index, contents) => {
  return {
    type: MODIFY_ITEM,
    index,
    contents
  };
};

const reqSuccess = () => {
  return {
    type: FIREBASE_SUCCESS
  };
};
const requestError = () => {
  return {
    type: FIREBASE_FAILURE
  };
};

export const openNewInvoicePage = () => dispatch => {
  console.log("1");
  dispatch(clearAllItems());
};
export const requestInitialInvoicesList = invoicesList => dispatch => {
  dispatch(getInitalInvoicesList(invoicesList));
};
export const addInvoiceToFirestore = (newInvoice, history) => dispatch => {
  dispatch(attemptPushNewInvoice());
  let uid = store.getState().auth.user.uid;
  db.collection("users")
    .doc(uid)
    .update({
      invoices: firestore.FieldValue.arrayUnion(newInvoice)
    })
    .then(function(doc) {
      console.log("New client pushed. Now pushing to redux store.");
      dispatch(pushNewInvoice(newInvoice));
    })
    .then(() => {
      history.push(`/invoice/${newInvoice.id}`);
      dispatch(firestoreSuccess());
    })
    .catch(function(error) {
      console.log("Error getting document:", error);
    });
};
export const addItemToStore = () => dispatch => {
  dispatch(pushNewItem());
};
export const deleteItemFromStore = index => dispatch => {
  dispatch(deleteItem(index));
};
export const modifyItemFromStore = (index, contents) => dispatch => {
  dispatch(modifyItem(index, contents));
};
export const makeInvoicePublic = invoice => dispatch => {
  console.log("store", store.getState().invoices.isSendingReq);
  if (!store.getState().invoices.isSendingReq) {
    dispatch(attemptPushNewInvoice());
    let uid = store.getState().auth.user.uid;
    let clientInfo = store
      .getState()
      .clients.clientsList.find(client => client.id === invoice.clientId);

    invoice = { ...invoice, clientInfo };
    console.log("clientInfo", clientInfo);
    db.collection("public-invoices")
      .doc(invoice.id.toString())
      .set(invoice)
      .then(function() {
        dispatch(reqSuccess());
        console.log("Public Invoices Document successfully written!");
      })
      .catch(function(error) {
        dispatch(requestError());
        console.error("Error writing document: ", error);
      });

    // db.collection("public-invoices")
    //   .doc(uid)
    //   .update({
    //     invoices: firestore.FieldValue.arrayUnion(invoice)
    //   })
    //   .then(function(doc) {
    //     dispatch(firestoreSuccess());
    //     console.log("Public Invoice pushed.");
    //   })
    //   .catch(function(error) {
    //     console.log("Error getting document:", error);
    //   });
  }
};
export const firestoreSuccess = () => dispatch => {
  dispatch(reqSuccess());
};
export const firestoreError = () => dispatch => {
  dispatch(requestError());
};
