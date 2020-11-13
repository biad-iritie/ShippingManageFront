import {
    ADD_COMPANY
} from "../actions/CompanyAction";
const initialState = {};

const companyReducer = function (state = initialState, action) {
    switch (action.type) {
        case ADD_COMPANY: {
            //console.log(action.data);
            return state = action.data;
        }
        default: {
            return state;
        }
    }
};

export default companyReducer;