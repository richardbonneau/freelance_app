import { myFirebase, db } from '../utils/fire.js';


export const FIRESTORE_REQUEST = "FIRESTORE_REQUEST";
export const FIRESTORE_SUCCESS = "FIRESTORE_SUCCESS";
export const FIRESTORE_FAILURE = "FIRESTORE_FAILURE";

//

const requestFirestore = () => {
    return {
        type: FIRESTORE_REQUEST
    }
};

const receiveFirestore = () => {
    return {
        type: FIRESTORE_SUCCESS
    }
};

const firestoreError = () => {
    return {
        type: FIRESTORE_FAILURE
    }
};


// export const firebaseSignup = (email, password) => dispatch => {
//     console.log("signing up")
//     dispatch(requestLogin());
//     myFirebase.auth().createUserWithEmailAndPassword(email, password).then(user => {
//         addNewUserToDatabase(user, dispatch);
//     }).catch(error => {
//         console.log("login error", error)
//         dispatch(loginError());
//     })
// };
// const addNewUserToDatabase = (user, dispatch) => {
//     console.log("addNewUserToDatabase", user)
//     dispatch(accessingDatabase());
//     db.collection("users").doc(user.user.uid).set({
//         clients: []
//     })
//         .then(function () {
//             console.log("hi")
//             dispatch(receiveLogin(user));
//             console.log("Document successfully written!");
//         })
//         .catch(function (error) {
//             dispatch(databaseError())
//             console.error("Error writing document: ", error);
//         });
// }

// export const firebaseLogin = (email, password) => dispatch => {
//     console.log("firebaseLogin")
//     dispatch(requestLogin());
//     myFirebase.auth().signInWithEmailAndPassword(email, password).then(user => {
//         console.log("firebaseLogin")
//         dispatch(receiveLogin(user));
//     }).catch(error => {
//         console.log("login error", error)
//         dispatch(loginError());
//     })
// };

// export const firebaseLogout = () => dispatch => {
//     console.log("logout")
//     dispatch(requestLogout());
//     myFirebase.auth().signOut().then(() => {
//         dispatch(receiveLogout());
//     }).catch(error => {
//         console.log("logout error", error)
//         dispatch(logoutError());
//     })
// };

// export const verifyAuth = () => dispatch => {
//     console.log("verify auth")
//     dispatch(verifyRequest());
//     myFirebase.auth().onAuthStateChanged(user => {
//         console.log("VERIFY auth", user)
//         if (user !== null) {
//             db.collection("users").doc(user.uid).get().then(function (doc) {
//                 if (doc.exists) {
//                     console.log("Document data:", doc.data());
//                     dispatch(receiveLogin(user));
//                 } else {
//                     // doc.data() will be undefined in this case
//                     console.log("verify auth error : No such document!");
//                 }
//             }).catch(function (error) {
//                 console.log("Error getting document:", error);
//             });



//         }
//         dispatch(verifySuccess());
//     })
// };