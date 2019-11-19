import navigation from './navigation';
import auth from "./auth";
import clients from "./clients";
import { combineReducers } from "redux";
export default combineReducers({auth, navigation, clients})