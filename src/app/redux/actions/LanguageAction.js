
export const SET_LANGUAGE = "SET_LANGUAGE";

export function setLanguage(data) {

    return dispatch => {
        dispatch({
            type: SET_LANGUAGE,
            data: data
        })
    }
}
