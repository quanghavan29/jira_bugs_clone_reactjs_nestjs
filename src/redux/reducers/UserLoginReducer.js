import { USER_LOGIN_LOCAL_STORAGE } from "../../util/config/constants";
import { LOGIN_DISPATCH_REDUCER } from "../constants/AuthConst";

let userLoginDefault = {};

if (localStorage.getItem(USER_LOGIN_LOCAL_STORAGE)) {
    userLoginDefault = JSON.parse(localStorage.getItem(USER_LOGIN_LOCAL_STORAGE));
}

const initialState = {
    userLogin: userLoginDefault,
}

const UserLoginReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_DISPATCH_REDUCER:
            return { ...state, userLogin: action.userLoginDispatch }
        default:
            return state
    }
}

export default UserLoginReducer;