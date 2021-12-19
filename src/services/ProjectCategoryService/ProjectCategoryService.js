import axios from "axios"
import { SERVER_API_URL } from "../../util/config/constants"

export const projectCategoryService = {
    getAllProjectCategory: () => {
        return axios({
            url: `${SERVER_API_URL}/project-category/get-all`,
            method: 'GET',
        })
    }
}