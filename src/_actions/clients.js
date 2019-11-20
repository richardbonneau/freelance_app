import { firestore, db } from '../utils/fire.js';
import store from "../store";

// export const INITIAL_CLIENTS_REQUEST = "INITIAL_CLIENTS_REQUEST";
// export const INITIAL_CLIENTS_SUCCESS = "INITIAL_CLIENTS_SUCCESS";
export const GET_INITIAL_CLIENTS_LIST = "GET_INITIAL_CLIENTS_LIST";
export const PUSH_NEW_CLIENT = "PUSH_NEW_CLIENT";
export const FIREBASE_FAILURE = "FIREBASE_FAILURE";

// const UID = store.getState().user.uid;
// console.log('store.getState()',store.getState())

// const sendRequest = () => {
//     return {
//         type: INITIAL_CLIENTS_REQUEST
//     }
// };
// const receiveData = () => {
//     return {
//         type: INITIAL_CLIENTS_SUCCESS
//     }
// };
const getInitalClientList = (clientsList) => {
    return {
        type: GET_INITIAL_CLIENTS_LIST,
        clientsList
    }
}
const pushNewClient = (newClient) => {
    return {
        type: PUSH_NEW_CLIENT,
        newClient
    }
};
const requestError = () => {
    return {
        type: FIREBASE_FAILURE
    }
};

export const requestInitialClientsList = (clientsList) => dispatch => {
    dispatch(getInitalClientList(clientsList))
};
export const addClientToFirestore = (newClient) => dispatch => {
    let uid = store.getState().auth.user.uid;
    db.collection("users").doc(uid).update({
        clients: firestore.FieldValue.arrayUnion(newClient)
      }).then(function (doc) {
        console.log("New client pushed. Now pushing to redux store.")
        dispatch(pushNewClient(newClient));
      }).catch(function (error) {
        console.log("Error getting document:", error);
      });
    
};
export const clientsFirestoreError = () => dispatch => {
    dispatch(requestError());
};