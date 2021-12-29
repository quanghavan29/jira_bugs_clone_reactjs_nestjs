import { LOGIN_SAGA } from "../../constants/AuthConst"

const loginAction = (username, password) => {
    return {
        type: LOGIN_SAGA,
        userLogin: {
            username: username,
            password: password,
        }
    }
}

export {
    loginAction,
}