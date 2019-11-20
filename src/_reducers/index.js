import navigation from './navigation';
import auth from "./auth";
import clients from "./clients";
import invoices from "./invoices";

import { combineReducers } from "redux";
export default combineReducers({auth, navigation, clients, invoices});