import {
  GET_INITIAL_PROJECTS_LIST,
  PUSH_NEW_PROJECT,
  FIREBASE_FAILURE
} from "../_actions";

export default (
  state = {
    isSendingReq: false,
    initialProjectsFetch: false,
    reqError: false,
    projectsList: []
  },
  action
) => {
  switch (action.type) {
    case GET_INITIAL_PROJECTS_LIST:
      return {
        ...state,
        projectsList: action.projectsList
      }
    case PUSH_NEW_PROJECT:
      console.log("state.projectsList", state.projectsList)
      return {
        ...state,
        projectsList: [...state.projectsList, action.newProject]
      }
    case FIREBASE_FAILURE:
      return {
        ...state,
        isSendingReq: false,
        reqError: true
      };
    default:
      return state;
  }
};
