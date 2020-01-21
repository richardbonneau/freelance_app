import { GET_INITIAL_EXPENSES_LIST, PUSH_NEW_EXPENSE, FIREBASE_FAILURE } from "../_actions";

export default (
  state = {
    isSendingReq: false,
    initialExpensesFetch: false,
    reqError: false,
    expensesList: []
  },
  action
) => {
  switch (action.type) {
    case GET_INITIAL_EXPENSES_LIST:
      return {
        ...state,
        expensesList: action.expensesList
      };
    case PUSH_NEW_EXPENSE:
      console.log("state.expensesList", state.expensesList);
      return {
        ...state,
        expensesList: [...state.expensesList, action.newExpense]
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
