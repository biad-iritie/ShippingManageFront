import {
  ADD_EMPLOYEE,
  DELETE_EMPLOYEE,
  REFETCH_EMPLOYEE
} from "../actions/EmployeesActions";

const initialState = [];

const EmployeesReducer = function (state = initialState, action) {
  switch (action.type) {
    case ADD_EMPLOYEE: {
      //console.log(state);
      //console.log(action);
      return [...action.data, ...state];
    }
    case REFETCH_EMPLOYEE: {
      return [...action.data];
    }

    case DELETE_EMPLOYEE: {
      return state.filter(rate => rate.id !== action.data);
    }

    default: {
      return state;
    }
  }
};

export default EmployeesReducer;
