import {
    TOGGLE_HAMBURGER_MENU,
  } from "../_actions";
  export default (
    state = {
        hamburgerMenuOpened: false,
    },
    action
  ) => {
    switch (action.type) {
      case TOGGLE_HAMBURGER_MENU:{
        return {
          ...state,
          hamburgerMenuOpened: !state.hamburgerMenuOpened
        };}
      default:
        return state;
    }
  };
