import navigation from './navigation';
import auth from "./auth";
import clients from "./clients";
import invoices from "./invoices";
import user from "./user";
import projects from "./projects";

import { combineReducers } from "redux";
export default combineReducers({ auth, navigation, clients, invoices, user, projects });