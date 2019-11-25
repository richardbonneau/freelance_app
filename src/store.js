import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import rootReducer from './_reducers/index.js'
import { verifyAuth } from "./_actions/auth.js";

const store = createStore(
  rootReducer,
  undefined,
  applyMiddleware(thunkMiddleware)
);

store.dispatch(verifyAuth());
export default store;
