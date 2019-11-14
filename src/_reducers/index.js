import navigation from './navigation';
import auth from "./auth"
import { combineReducers } from "redux";
console.log('navigation',navigation)
console.log('auth',auth)
export default combineReducers({auth, navigation})