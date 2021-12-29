import { DISPATCH_USERS_SEARCHED_ON_REDUCER } from "../constants/UserConst";

const initialState = {
    usersSearched: [],
}

const UserReducer = (state = initialState, action) => {
    switch (action.type) {
        case DISPATCH_USERS_SEARCHED_ON_REDUCER:
            return { ...state, usersSearched: action.usersSearched }
        default:
            return state
    }
}

export default UserReducer;