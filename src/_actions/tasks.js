import { firestore, db } from "../utils/fire.js";
import store from "../store";

export const GET_INITIAL_TASKS_LIST = "GET_INITIAL_TASKS_LIST";
export const PUSH_NEW_TASK = "PUSH_NEW_TASK";
export const FIREBASE_FAILURE = "FIREBASE_FAILURE";

const getInitalTasksListFromFirebase = tasksList => {
  return {
    type: GET_INITIAL_TASKS_LIST,
    tasksList
  };
};
const pushNewTask = newTask => {
  return {
    type: PUSH_NEW_TASK,
    newTask
  };
};

const requestError = () => {
  return {
    type: FIREBASE_FAILURE
  };
};

export const requestInitialTasksList = tasksList => dispatch => {
  dispatch(getInitalTasksListFromFirebase(tasksList));
};

export const addTaskToFirestore = newTask => dispatch => {
  let uid = store.getState().auth.user.uid;
  db.collection("users")
    .doc(uid)
    .update({
      tasks: firestore.FieldValue.arrayUnion(newTask)
    })
    .then(function(doc) {
      console.log("New task pushed. Now pushing to redux store.");
      dispatch(pushNewTask(newTask));
    })
    .catch(function(error) {
      dispatch(firestoreError());
      console.log("Error getting document:", error);
    });
};
export const firestoreError = () => dispatch => {
  dispatch(requestError());
};
