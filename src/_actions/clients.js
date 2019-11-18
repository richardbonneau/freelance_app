import { myFirebase, db } from '../utils/fire.js';


export const CLIENTS_REQUEST = "CLIENTS_REQUEST";
export const CLIENTS_SUCCESS = "CLIENTS_SUCCESS";
export const CLIENTS_FAILURE = "CLIENTS_FAILURE";

//

const sendRequest = () => {
    return {
        type: CLIENTS_REQUEST
    }
};

const receiveData = () => {
    return {
        type: CLIENTS_SUCCESS
    }
};

const requestError = () => {
    return {
        type: CLIENTS_FAILURE
    }
};

export const requestFirestore = () => dispatch => {
    dispatch(sendRequest());
};
export const receiveFirestore = () => dispatch => {
    dispatch(receiveData());
};
export const firestoreError = () => dispatch => {
    dispatch(requestError());
};