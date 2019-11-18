import { myFirebase, db } from '../utils/fire.js';


export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAILURE = "LOGOUT_FAILURE";

export const VERIFY_REQUEST = "VERIFY_REQUEST";
export const VERIFY_SUCCESS = "VERIFY_SUCCESS";

export const DATABASE_ACCESS = "DATABASE_ACCESS";
export const DATABASE_FAILURE = "DATABASE_FAILURE";

const requestLogin = () => {
    return {
        type: LOGIN_REQUEST
    }
};

const receiveLogin = user => {
    return {
        type: LOGIN_SUCCESS,
        user
    }
};

const loginError = () => {
    return {
        type: LOGIN_FAILURE
    }
};

const requestLogout = () => {
    return {
        type: LOGOUT_REQUEST
    }
};

const receiveLogout = () => {
    return {
        type: LOGOUT_SUCCESS
    }
};

const logoutError = () => {
    return {
        type: LOGOUT_FAILURE
    }
};

const verifyRequest = () => {
    return {
        type: VERIFY_REQUEST
    }
};

const verifySuccess = () => {
    return {
        type: VERIFY_SUCCESS
    }
};

const databaseError = () => {
    return {
        type: DATABASE_FAILURE
    }
};
const accessingDatabase = () => {
    console.log("accessingDatabase")
    return {
        type: DATABASE_ACCESS
    }
}
export const firebaseSignup = (email, password) => dispatch => {
    console.log("signing up")
    dispatch(requestLogin());
    myFirebase.auth().createUserWithEmailAndPassword(email, password).then(user => {
        addNewUserToDatabase(user, dispatch);
    }).catch(error => {
        console.log("login error", error)
        dispatch(loginError());
    })
};
const addNewUserToDatabase = (user, dispatch) => {
    dispatch(accessingDatabase());
    db.collection("users").doc(user.user.uid).set({
        clients: [{name:"Example Client"}]
    })
        .then(function () {
            console.log("hi")
            dispatch(receiveLogin(user.user));
            console.log("Document successfully written!");
        })
        .catch(function (error) {
            dispatch(databaseError())
            console.error("Error writing document: ", error);
        });
}

export const firebaseLogin = (email, password) => dispatch => {
    console.log("firebaseLogin")
    dispatch(requestLogin());
    myFirebase.auth().signInWithEmailAndPassword(email, password).then(user => {
        console.log("firebaseLogin")
        dispatch(receiveLogin(user));
    }).catch(error => {
        console.log("login error", error)
        dispatch(loginError());
    })
};

export const firebaseLogout = () => dispatch => {
    console.log("logout")
    dispatch(requestLogout());
    myFirebase.auth().signOut().then(() => {
        dispatch(receiveLogout());
    }).catch(error => {
        console.log("logout error", error)
        dispatch(logoutError());
    })
};

export const verifyAuth = () => dispatch => {
    console.log("verify auth")
    dispatch(verifyRequest());
    myFirebase.auth().onAuthStateChanged(user => {
        console.log("VERIFY auth", user)
        if (user !== null) {
            db.collection("users").doc(user.uid).get().then(function (doc) {
                if (doc.exists) {
                    console.log("Document data:", doc.data());
                    dispatch(receiveLogin(user));
                } else {
                    // doc.data() will be undefined in this case
                    console.log("verify auth error : No such document!");
                }
            }).catch(function (error) {
                console.log("Error getting document:", error);
            });



        }
        dispatch(verifySuccess());
    })
};