import { firestore, db } from '../utils/fire.js';
import store from "../store";

export const GET_INITIAL_USER_INFO = "GET_INITIAL_USER_INFO";
export const EDIT_USER_INFO = "EDIT_USER_INFO";
export const FIREBASE_FAILURE = "FIREBASE_FAILURE";

const getInitialUserInfoFromFirebase = (userInfo) => {
    console.log("here", userInfo)
    return {
        type: GET_INITIAL_USER_INFO,
        userInfo
    }
};
const editUserInfo = (userInfo) => {
    return {
        type: EDIT_USER_INFO,
        userInfo
    }
};

const requestError = () => {
    return {
        type: FIREBASE_FAILURE
    }
};

export const requestInitialUserInfo = (userInfo) => dispatch => {
    dispatch(getInitialUserInfoFromFirebase(userInfo))
};

export const editUserInfoInFirestore = (newUserInfo) => dispatch => {
    console.log()
    let uid = store.getState().auth.user.uid;
    db.collection("users").doc(uid).update({
        userInfo: newUserInfo
      }).then(function (doc) {
        console.log("New client pushed. Now pushing to redux store.")
        dispatch(editUserInfo(newUserInfo));
      }).catch(function (error) {
          dispatch(firestoreError());
        console.log("Error getting document:", error);
      });
};
export const firestoreError = () => dispatch => {
    dispatch(requestError());
};