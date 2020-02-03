import { myFirebase, db } from "../utils/fire.js";
import { initialUserDocument } from "../utils/static.js";
import {
  requestInitialClientsList,
  requestInitialInvoicesList,
  requestInitialProjectsList,
  requestInitialTasksList,
  requestInitialExpensesList,
  requestInitialUserInfo,
  firestoreSuccess
} from "./index";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAILURE = "LOGOUT_FAILURE";

export const VERIFY_REQUEST = "VERIFY_REQUEST";
export const VERIFY_SUCCESS = "VERIFY_SUCCESS";
export const VERIFY_FAIL = "VERIFY_FAIL";

export const DATABASE_ACCESS = "DATABASE_ACCESS";
export const DATABASE_FAILURE = "DATABASE_FAILURE";

const requestLogin = () => {
  return {
    type: LOGIN_REQUEST
  };
};

const receiveLogin = user => {
  return {
    type: LOGIN_SUCCESS,
    user
  };
};

const loginError = error => {
  return {
    type: LOGIN_FAILURE,
    error
  };
};

const requestLogout = () => {
  return {
    type: LOGOUT_REQUEST
  };
};

const receiveLogout = () => {
  return {
    type: LOGOUT_SUCCESS
  };
};

const logoutError = () => {
  return {
    type: LOGOUT_FAILURE
  };
};

const verifyRequest = () => {
  return {
    type: VERIFY_REQUEST
  };
};

const verifySuccess = () => {
  return {
    type: VERIFY_SUCCESS
  };
};
const verifyFail = () => {
  return {
    type: VERIFY_FAIL
  };
};

const databaseError = () => {
  return {
    type: DATABASE_FAILURE
  };
};
const accessingDatabase = () => {
  return {
    type: DATABASE_ACCESS
  };
};
export const firebaseSignup = (email, password) => dispatch => {
  dispatch(requestLogin());
  myFirebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(user => {
      addNewUserToDatabase(user, dispatch);
    })
    .catch(error => {
      console.log("login error", error);
      dispatch(loginError(error));
    });
};
const addNewUserToDatabase = (user, dispatch) => {
  console.log("initialUserDocument", initialUserDocument);
  dispatch(accessingDatabase());
  db.collection("users")
    .doc(user.user.uid)
    .set(initialUserDocument)
    .then(function() {
      dispatch(receiveLogin(user.user));
      console.log("User Document successfully written!");
      dispatch(accessingDatabase());
      db.collection("public-invoices")
        .doc(user.user.uid)
        .set({ invoices: [] })
        .then(function() {
          dispatch(receiveLogin(user.user));
          console.log("Public Invoices Document successfully written!");
        })
        .catch(function(error) {
          dispatch(databaseError());
          console.error("Error writing document: ", error);
        });
    })
    .catch(function(error) {
      dispatch(databaseError());
      console.error("Error writing document: ", error);
    });
};

export const firebaseLogin = (email, password) => dispatch => {
  dispatch(requestLogin());
  myFirebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(user => {
      console.log("***firebaseLogin", user);
    })
    .catch(error => {
      console.log("login error", error);
      dispatch(loginError(error));
    });
};

const getUserDataAndLogin = user => dispatch => {
  db.collection("users")
    .doc(user.uid)
    .get()
    .then(function(doc) {
      if (doc.exists) {
        console.log("doc.data()", doc.data());
        dispatch(requestInitialClientsList(doc.data().clients));
        dispatch(requestInitialInvoicesList(doc.data().invoices));
        dispatch(requestInitialUserInfo(doc.data().userInfo));
        dispatch(requestInitialProjectsList(doc.data().projects));
        dispatch(requestInitialTasksList(doc.data().tasks));
        dispatch(requestInitialExpensesList(doc.data().expenses));

        dispatch(receiveLogin(user));
        dispatch(firestoreSuccess());
        dispatch(verifySuccess());
        console.log("This user exists in the database. Document data:", doc.data());
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
        dispatch(verifyFail());
      }
    })
    .catch(function(error) {
      console.log("Error getting document:", error);
    });
};

export const firebaseLogout = () => dispatch => {
  dispatch(requestLogout());
  myFirebase
    .auth()
    .signOut()
    .then(() => {
      dispatch(receiveLogout());
    })
    .catch(error => {
      console.log("logout error", error);
      dispatch(logoutError());
    });
};

export const verifyAuth = () => dispatch => {
  dispatch(verifyRequest());
  myFirebase.auth().onAuthStateChanged(user => {
    console.log("***VERIFY auth", user);
    if (user !== null) {
      dispatch(getUserDataAndLogin(user));
    } else dispatch(verifyFail());
  });
};
