import {
    ADD_ORDER,
    REFETCH_ORDER,
    UPDATE_ORDER
} from "../actions/OrderActions";

const initialState = [];

const orderReducer = function (state = initialState, action) {
    switch (action.type) {
        case ADD_ORDER: {
            return [...action.data, ...state];
        }
        case REFETCH_ORDER: {
            return [...action.data];
        }
        case UPDATE_ORDER: {
            var neworder = state.map(order => {
                //console.log(action);
                //console.log(rate.id === action.data.id);
                return order.id === action.data.id ? action.data : order;
            })
            return neworder;
        }
        /* case UPDATE_RATE: {
            console.log(state);
            var newrates = state.map(rate => {
                //console.log(action);
                //console.log(rate.id === action.data.id);
                return rate.id === action.data.id ? action.data : rate;
            })
            console.log(newrates);
            return newrates;
        }
        case DELETE_RATE: {
            return state.filter(rate => rate.id !== action.data);
        } */

        default: {
            return state;
        }
    }
};

export default orderReducer;