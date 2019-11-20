import { firestore, db } from '../utils/fire.js';
import store from "../store";

export const GET_INITIAL_INVOICES_LIST = "GET_INITIAL_INVOICES_LIST";
export const PUSH_NEW_INVOICE = "PUSH_NEW_INVOICE";
export const FIREBASE_FAILURE = "FIREBASE_FAILURE";

const getInitalInvoicesList = (invoicesList) => {
    return {
        type: GET_INITIAL_CLIENTS_LIST,
        invoicesList
    };
};
const pushNewInvoice = (newInvoice) => {
    return {
        type: PUSH_NEW_CLIENT,
        newInvoice
    };
};
const requestError = () => {
    return {
        type: FIREBASE_FAILURE
    };
};

export const requestInitialInvoicesList = (invoicesList) => dispatch => {
    dispatch(getInitalInvoicesList(invoicesList))
};
export const addInvoiceToFirestore = (newInvoice) => dispatch => {
    let uid = store.getState().auth.user.uid;
    db.collection("users").doc(uid).update({
        invoices: firestore.FieldValue.arrayUnion(newInvoice)
      }).then(function (doc) {
        console.log("New client pushed. Now pushing to redux store.")
        dispatch(pushNewInvoice(newInvoice));
      }).catch(function (error) {
        console.log("Error getting document:", error);
      });
};
export const firestoreError = () => dispatch => {
    dispatch(requestError());
};