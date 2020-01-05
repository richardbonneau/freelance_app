import { firestore, db } from '../utils/fire.js';
import store from "../store";

export const GET_INITIAL_PROJECTS_LIST = "GET_INITIAL_PROJECTS_LIST";
export const PUSH_NEW_PROJECT = "PUSH_NEW_PROJECT";
export const FIREBASE_FAILURE = "FIREBASE_FAILURE";

const getInitalProjectsListFromFirebase = (projectsList) => {
    return {
        type: GET_INITIAL_PROJECTS_LIST,
        projectsList
    }
};
const pushNewProject = (newProject) => {
    return {
        type: PUSH_NEW_PROJECT,
        newProject
    }
};

const requestError = () => {
    return {
        type: FIREBASE_FAILURE
    }
};

export const requestInitialProjectsList = (projectsList) => dispatch => {
    dispatch(getInitalProjectsListFromFirebase(projectsList))
};

export const addProjectToFirestore = (newProject) => dispatch => {
    let uid = store.getState().auth.user.uid;
    db.collection("users").doc(uid).update({
        projects: firestore.FieldValue.arrayUnion(newProject)
    }).then(function (doc) {
        console.log("New project pushed. Now pushing to redux store.")
        dispatch(pushNewProject(newProject));
    }).catch(function (error) {
        dispatch(firestoreError());
        console.log("Error getting document:", error);
    });

};
export const firestoreError = () => dispatch => {
    dispatch(requestError());
};