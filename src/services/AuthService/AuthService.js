import axios from "axios"
import { SERVER_API_URL } from "../../util/config/constants"

export const authService = {
    login: (userLogin) => {
        const response = axios({
            url: `${SERVER_API_URL}/authenticate`,
            method: 'POST',
            data: userLogin,
        })

        return response;
    },

    register: (userRegister) => {
        return axios({
            url: `${SERVER_API_URL}/register`,
            method: 'POST',
            data: userRegister,
        })
    }
}