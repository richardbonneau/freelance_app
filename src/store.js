import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import rootReducer from './_reducers/index.js'
import { verifyAuth } from "./_actions/auth.js";


//https://itnext.io/firebase-login-functionality-from-scratch-with-react-redux-2bf316e5820f



console.log("root",rootReducer)
const store = createStore(
  rootReducer,
  undefined,
  applyMiddleware(thunkMiddleware)
);

store.dispatch(verifyAuth());
export default store;
