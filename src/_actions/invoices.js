import { firestore, db } from '../utils/fire.js';
import store from "../store";

export const GET_INITIAL_INVOICES_LIST = "GET_INITIAL_INVOICES_LIST";
export const PUSH_NEW_INVOICE = "PUSH_NEW_INVOICE";
export const INVOICE_PUSH_SUCCESS = "INVOICE_PUSH_SUCCESS";
export const FIREBASE_FAILURE = "FIREBASE_FAILURE";
export const FIREBASE_SUCCESS = "FIREBASE_SUCCESS";
export const ATTEMPT_PUSHING_NEW_INVOICE = "ATTEMPT_PUSHING_NEW_INVOICE";


const getInitalInvoicesList = (invoicesList) => {
    return {
        type: GET_INITIAL_INVOICES_LIST,
        invoicesList
    };
};
const pushNewInvoice = (newInvoice) => {
    return {
        type: PUSH_NEW_INVOICE,
        newInvoice
    };
};
const attemptPushNewInvoice = () => {
    return {
        type:ATTEMPT_PUSHING_NEW_INVOICE
    }
}
const reqSuccess = () => {
    return {
        type:FIREBASE_SUCCESS
    }
}
const requestError = () => {
    return {
        type: FIREBASE_FAILURE
    };
};

export const requestInitialInvoicesList = (invoicesList) => dispatch => {
    console.log("dis")
    dispatch(getInitalInvoicesList(invoicesList))
};
export const addInvoiceToFirestore = (newInvoice,history) => dispatch => {
    console.log('newInvoice',newInvoice)
    dispatch(attemptPushNewInvoice());
    let uid = store.getState().auth.user.uid;
    db.collection("users").doc(uid).update({
        invoices: firestore.FieldValue.arrayUnion(newInvoice)
      }).then(function (doc) {
        console.log("New client pushed. Now pushing to redux store.")
        dispatch(pushNewInvoice(newInvoice));
      }).then(()=>{
        history.push(`/invoice/${newInvoice.id}`);
        dispatch(firestoreSuccess());
      }).catch(function (error) {
        console.log("Error getting document:", error);
      });
};
export const firestoreSuccess = () => dispatch =>{
    dispatch(reqSuccess());
}
export const firestoreError = () => dispatch => {
    dispatch(requestError());
};