import { createStore } from "redux";

let reducer = (state, action) => {
  switch(action.type){
    case "toggleHamburgerMenu": return {...state, hamburgerMenuOpened: action.payload}
    default: return state
  }
};

let initState = {
  hamburgerMenuOpened:false
}


const store = createStore(
  reducer,
  initState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
export default store;
