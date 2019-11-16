import { myFirebase } from '../utils/fire.js';


export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAILURE = "LOGOUT_FAILURE";

export const VERIFY_REQUEST = "VERIFY_REQUEST";
export const VERIFY_SUCCESS = "VERIFY_SUCCESS";

const requestLogin = () => {
    return {
        type: LOGOUT_REQUEST
    }
};

const receiveLogin = user =>{
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
        type:LOGOUT_REQUEST
    }
};

const receiveLogout = () => {
    return {
        type:LOGOUT_SUCCESS
    }
};

const logoutError = () =>{
    return {
        type: LOGOUT_FAILURE
    }
};

const verifyRequest = () =>{
    return {
        type: VERIFY_REQUEST
    }
};

const verifySuccess = () =>{
    return {
        type: VERIFY_SUCCESS
    }
};
export const firebaseSignup = (email,password)=> dispatch =>{
    dispatch(requestLogin());
    myFirebase.auth().createUserWithEmailAndPassword(email,password).then(user=>{
        dispatch(receiveLogin(user));
    }).catch(error=>{
        dispatch(loginError());
    })
};


export const firebaseLogin = (email,password)=> dispatch =>{
    dispatch(requestLogin());
    myFirebase.auth().signInWithEmailAndPassword(email,password).then(user=>{
        dispatch(receiveLogin(user));
    }).catch(error=>{
        dispatch(loginError());
    })
};

export const firebaseLogout = () => dispatch => {
    console.log("logout")
    dispatch(requestLogout());
    myFirebase.auth().signOut().then(()=>{
        dispatch(receiveLogout());
    }).catch(error=>{
        dispatch(logoutError());
    })
};

export const verifyAuth = () => dispatch => {
    dispatch(verifyRequest());
    myFirebase.auth().onAuthStateChanged(user=>{
        if(user !== null) {
            dispatch(receiveLogin(user));
        }
        dispatch(verifySuccess());
    })
};