import {
    TOGGLE_HAMBURGER_MENU,
    PICK_CURRENT_PAGE
  } from "../_actions";
  export default (
    state = {
        hamburgerMenuOpened: false,
        currentPage: "dashboard"
    },
    action
  ) => {
    switch (action.type) {
      case TOGGLE_HAMBURGER_MENU:{
        return {
          ...state,
          hamburgerMenuOpened: !state.hamburgerMenuOpened
        };}
      case PICK_CURRENT_PAGE:
        return {
        ...state,
        currentPage: action.page
      }
      default:
        return state;
    }
  };
