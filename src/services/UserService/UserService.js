import axios from "axios"
import { ACCESS_TOKEN, SERVER_API_URL } from "../../util/config/constants"

export const userService = {
    searhUser: (username) => {
        const id_token = localStorage.getItem(ACCESS_TOKEN);
        const response = axios({
            url: `${SERVER_API_URL}/users/search-user?username=${username}`,
            method: 'GET',
            headers: { 'authorization': 'Bearer ' + id_token },
        })

        return response;
    },
    updateUser: (userUpdate) => {
        const id_token = localStorage.getItem(ACCESS_TOKEN);
        const response = axios({
            url: `${SERVER_API_URL}/users/update-user`,
            method: 'PUT',
            data: {...userUpdate},
            headers: { 'authorization': 'Bearer ' + id_token },
        })

        return response;
    }
}