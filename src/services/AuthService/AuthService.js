import axios from "axios"
import { SERVER_API_URL } from "../../util/config/constants"

export const authService = {
    login: (userLogin) => {
        const response = axios({
            url: `${SERVER_API_URL}/users/signin`,
            method: 'POST',
            data: userLogin,
        })

        return response;
    }
}