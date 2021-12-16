import { LOGIN_SAGA } from "../../constants/AuthConst"

const loginAction = (email, password) => {
    return {
        type: LOGIN_SAGA,
        userLogin: {
            email,
            password,
        }
    }
}

export {
    loginAction,
}