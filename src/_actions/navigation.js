export const TOGGLE_HAMBURGER_MENU = "TOGGLE_HAMBURGER_MENU";

const toggleHamburger = () => {
    return {
        type: TOGGLE_HAMBURGER_MENU
    }
};

export const toggleHamburgerMenu = () => dispatch => {
    dispatch(toggleHamburger());
};