
export const ADD_RATE = "ADD_RATE";
export const UPDATE_RATE = "UPDATE_RATE";
export const DELETE_RATE = "DELETE_RATE";
export const REFETCH_RATE = "REFETCH_RATE";

export function addRate(data) {
    //console.log(data);
    return dispatch => {
        dispatch({
            type: ADD_RATE,
            data: data
        })
    }
}
export function refetchRate(data) {
    return dispatch => {
        dispatch({
            type: REFETCH_RATE,
            data: data
        })
    }
}
export function updateRate(data) {
    //console.log(data);
    return dispatch => {
        dispatch({
            type: UPDATE_RATE,
            data: data
        })
    }
}
export function deleteRate(data) {
    //console.log(data);
    return dispatch => {
        dispatch({
            type: DELETE_RATE,
            data: data
        })
    }
}
