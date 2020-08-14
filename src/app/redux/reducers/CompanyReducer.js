import {
    ADD_COMPANY
} from "../actions/CompanyAction";
const initialState = {};

const companyReducer = function (state = initialState, action) {
    switch (action.type) {
        case ADD_COMPANY: {
            return state = action.data;
        }
        default: {
            return state;
        }
    }
};

export default companyReducer;