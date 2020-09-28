import {
    ADD_RATE,
    UPDATE_RATE,
    DELETE_RATE,
    REFETCH_RATE
} from "../actions/RateAction";
const initialState = [];

const rateReducer = function (state = initialState, action) {
    switch (action.type) {
        case ADD_RATE: {
            //console.log(state);
            //console.log(action);
            return [...action.data, ...state];
        }
        case REFETCH_RATE: {
            return [...action.data];
        }
        case UPDATE_RATE: {
            //console.log(state);
            var newrates = state.map(rate => {
                //console.log(action);
                //console.log(rate.id === action.data.id);
                return rate.id === action.data.id ? action.data : rate;
            })
            //console.log(newrates);
            return newrates;
        }
        case DELETE_RATE: {
            return state.filter(rate => rate.id !== action.data);
        }

        default: {
            return state;
        }
    }
};
/* state.myCourses.map(course => {
    course.numero_course === action.data.numero_course ? course.status = action.data.status : null;
    return course;
}) */
export default rateReducer;