import {
    SET_LANGUAGE
} from "../actions/LanguageAction";
const initialState = navigator.language;


const languageReducer = function (state = initialState, action) {
    switch (action.type) {
        case SET_LANGUAGE: {
            //console.log(action.data);
            return state = action.data;
        }
        default: {
            return state;
        }
    }
};

export default languageReducer;