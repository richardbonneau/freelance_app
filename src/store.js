import { createStore } from "redux";
let reducer = (state, action) => {};
let initState = {}
const store = createStore(
  reducer,
  initState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
export default store;
