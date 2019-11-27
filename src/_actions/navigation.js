export const TOGGLE_HAMBURGER_MENU = "TOGGLE_HAMBURGER_MENU";
export const PICK_CURRENT_PAGE = "PICK_CURRENT_PAGE";

const toggleHamburger = () => {
    return {
        type: TOGGLE_HAMBURGER_MENU
    }
};
const changePage = (page) => {
    return {
        type: PICK_CURRENT_PAGE,
        page
    }
};

export const toggleHamburgerMenu = () => dispatch => {
    dispatch(toggleHamburger());
};
export const pickCurrentPage = (page) => dispatch => {
    dispatch(changePage(page));
};