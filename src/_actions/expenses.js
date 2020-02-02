import { firestore, db, firebaseStorage } from "../utils/fire.js";
import store from "../store";

export const GET_INITIAL_EXPENSES_LIST = "GET_INITIAL_EXPENSES_LIST";
export const PUSH_NEW_EXPENSE = "PUSH_NEW_EXPENSE";
export const FIREBASE_FAILURE = "FIREBASE_FAILURE";

const getInitalExpensesListFromFirebase = expensesList => {
  return {
    type: GET_INITIAL_EXPENSES_LIST,
    expensesList
  };
};
const pushNewExpense = newExpense => {
  return {
    type: PUSH_NEW_EXPENSE,
    newExpense
  };
};

const requestError = () => {
  return {
    type: FIREBASE_FAILURE
  };
};

export const requestInitialExpensesList = expensesList => dispatch => {
  dispatch(getInitalExpensesListFromFirebase(expensesList));
};

export const addExpenseToFirestore = newExpense => dispatch => {
  const pushToFirestore = () => {
    let uid = store.getState().auth.user.uid;
    db.collection("users")
      .doc(uid)
      .update({
        expenses: firestore.FieldValue.arrayUnion(newExpense)
      })
      .then(function(doc) {
        console.log("New expense pushed. Now pushing to redux store.");
        dispatch(pushNewExpense(newExpense));
      })
      .catch(function(error) {
        dispatch(firestoreError());
        console.log("Error getting document:", error);
      });
  };

  if (newExpense.image !== "") {
    const imageAsFile = newExpense.image;
    const uploadTask = firebaseStorage.ref(`/images/${imageAsFile.name}`).put(imageAsFile);
    uploadTask.on(
      "state_changed",
      snapShot => {
        console.log(snapShot);
      },
      err => {
        console.log(err);
      },
      () => {
        firebaseStorage
          .ref("images")
          .child(imageAsFile.name)
          .getDownloadURL()
          .then(firebaseUrl => {
            newExpense.image = firebaseUrl;
            pushToFirestore();
          });
      }
    );
  } else pushToFirestore();
};
export const firestoreError = () => dispatch => {
  dispatch(requestError());
};
