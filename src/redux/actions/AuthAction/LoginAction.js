import { LOGIN_SAGA } from "../../constants/AuthConst"

const loginAction = (email, password) => {
    return {
        type: LOGIN_SAGA,
        userLogin: {
            username: email,
            password: password,
        }
    }
}

export {
    loginAction,
}