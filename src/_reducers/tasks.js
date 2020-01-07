import { GET_INITIAL_TASKS_LIST, PUSH_NEW_TASK, FIREBASE_FAILURE } from "../_actions";

export default (
  state = {
    isSendingReq: false,
    initialTasksFetch: false,
    reqError: false,
    tasksList: []
  },
  action
) => {
  switch (action.type) {
    case GET_INITIAL_TASKS_LIST:
      return {
        ...state,
        tasksList: action.tasksList
      };
    case PUSH_NEW_TASK:
      console.log("state.tasksList", state.tasksList);
      return {
        ...state,
        tasksList: [...state.tasksList, action.newTask]
      };
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
