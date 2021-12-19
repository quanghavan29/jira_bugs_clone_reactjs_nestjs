import axios from "axios"
import { ACCESS_TOKEN, SERVER_API_URL } from "../../util/config/constants"

export const accountService = {
    getCurrentUserLogin: () => {
        const id_token = localStorage.getItem(ACCESS_TOKEN);
        const response = axios({
            url: `${SERVER_API_URL}/account`,
            method: 'GET',
            headers: {'authorization': 'Bearer ' + id_token},
        })

        return response;
    }
}