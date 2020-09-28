export const ADD_ORDER = "ADD_ORDER";
export const REFETCH_ORDER = "REFETCH_ORDER";
export const UPDATE_ORDER = "UPDATE_ORDER";

export function addOrder(data) {
    //console.log(data);
    return dispatch => {
        dispatch({
            type: ADD_ORDER,
            data: data
        })
    }
}
export function refetchOrder(data) {
    //console.log(data);
    return dispatch => {
        dispatch({
            type: REFETCH_ORDER,
            data: data
        })
    }
}

export function updateOrder(data) {
    //console.log(data);
    return dispatch => {
        dispatch({
            type: UPDATE_ORDER,
            data: data
        })
    }
}