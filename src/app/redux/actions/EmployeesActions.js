
export const ADD_EMPLOYEE = "ADD_EMPLOYEE";
//export const UPDATE_RATE = "UPDATE_RATE";
export const DELETE_EMPLOYEE = "DELETE_EMPLOYEE";
export const REFETCH_EMPLOYEE = "REFETCH_EMPLOYEE";
export const UPDATE_EMPLOYEE_ROLE = "UPDATE_EMPLOYEE_ROLE";

export function addEmployee(data) {
  //console.log(data);
  return dispatch => {
    dispatch({
      type: ADD_EMPLOYEE,
      data: data
    })
  }
}
export function refetchEmployee(data) {
  return dispatch => {
    dispatch({
      type: REFETCH_EMPLOYEE,
      data: data
    })
  }
}
export function updateEmployeeRole(data) {
  //console.log(data);
  return dispatch => {
    dispatch({
      type: UPDATE_EMPLOYEE_ROLE,
      data: data
    })
  }
}
export function deleteEmployee(data) {
  //console.log(data);
  return dispatch => {
    dispatch({
      type: DELETE_EMPLOYEE,
      data: data
    })
  }
}