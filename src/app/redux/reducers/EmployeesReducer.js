import {
  ADD_EMPLOYEE,
  DELETE_EMPLOYEE,
  REFETCH_EMPLOYEE,
  UPDATE_EMPLOYEE_ROLE
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
    case UPDATE_EMPLOYEE_ROLE: {
      var newEmployees = state.map(employee => {
        //console.log(action);
        //console.log(rate.id === action.data.id);
        return employee.id === action.data.id ? action.data : employee;
      })
      return newEmployees;
    }
    case DELETE_EMPLOYEE: {
      return state.filter(employee => employee.id !== action.data);
    }

    default: {
      return state;
    }
  }
};

export default EmployeesReducer;
