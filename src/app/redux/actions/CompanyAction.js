
export const ADD_COMPANY = "ADD_COMPANY";

export function addCompany(data) {

    return dispatch => {
        dispatch({
            type: ADD_COMPANY,
            data: data
        })
    }
}
