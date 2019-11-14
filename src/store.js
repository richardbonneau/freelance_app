import { createStore } from "redux";
import rootReducer from './_reducers/index.js'

//https://itnext.io/firebase-login-functionality-from-scratch-with-react-redux-2bf316e5820f

let initState = {
  hamburgerMenuOpened:false
}
console.log("root",rootReducer)
const store = createStore(
  rootReducer,
  initState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
export default store;
