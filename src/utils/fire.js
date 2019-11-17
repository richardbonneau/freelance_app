import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCJCAh72TcVY8GZs7hpxIKsVYgbAhjSEmo",
    authDomain: "freelance-assistant.firebaseapp.com",
    databaseURL: "https://freelance-assistant.firebaseio.com",
    projectId: "freelance-assistant",
    storageBucket: "freelance-assistant.appspot.com",
    messagingSenderId: "826445432398",
    appId: "1:826445432398:web:3c830e62ea23ae766a651f",
    measurementId: "G-C1P4WY399S"
  };
  export const myFirebase = firebase.initializeApp(firebaseConfig);
  const baseDb = myFirebase.firestore();
  export const db = baseDb;
  export const firestore = firebase.firestore;