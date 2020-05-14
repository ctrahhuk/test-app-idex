import { CREATE_USER } from "../actions/profilePageActions";


export const profilePageReducer = (state = {}, action) => {
    switch (action.type) {
        case CREATE_USER:
            return {...state, isLoading: true, ...action.payload};

        default:
            return state
    }
};
