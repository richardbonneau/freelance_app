import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import rootReducer from './_reducers/index.js'
import { verifyAuth } from "./_actions/auth.js";
import { composeWithDevTools } from 'redux-devtools-extension';

const store = createStore(
  rootReducer,
  undefined,
  composeWithDevTools(applyMiddleware(thunkMiddleware))
  
);

store.dispatch(verifyAuth());
export default store;
