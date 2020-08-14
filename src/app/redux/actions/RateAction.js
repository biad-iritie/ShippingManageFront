
export const ADD_RATE = "ADD_RATE";
export const UPDATE_RATE = "UPDATE_RATE";

export function addRate(data) {
    //console.log(data);
    return dispatch => {
        dispatch({
            type: ADD_RATE,
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
