import { createStore } from "redux";

let reducer = (state, action) => {
  switch(action.type){
    case "increment": return {counter:state.counter+1}
    default: return state
  }
};

let initState = {
  counter:0
}


const store = createStore(
  reducer,
  initState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
export default store;
