export default (state = {
    hamburgerMenuOpened: false
}, action) =>{
    switch(action.type){
        case "toggleHamburgerMenu": return {...state, hamburgerMenuOpened: action.payload}
        default: return state
      }
}
