export const TOGGLE_HAMBURGER_MENU = "TOGGLE_HAMBURGER_MENU";

const toggleHamburger = () => {
    console.log("toggleHamburger")
    return {
        type: TOGGLE_HAMBURGER_MENU
    }
};

export const toggleHamburgerMenu = () => dispatch => {
    console.log("toggleHamburgerMenu")
    dispatch(toggleHamburger());
};