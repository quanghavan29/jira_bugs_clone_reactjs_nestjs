import axios from "axios"
import { ACCESS_TOKEN, SERVER_API_URL } from "../../util/config/constants"
const id_token = localStorage.getItem(ACCESS_TOKEN);

export const projectService = {
    createProject: (newProject) => {
        return axios({
            url: `${SERVER_API_URL}/project/create-project`,
            method: 'POST',
            data: { ...newProject, createdBy: 'Anonymous' },
            headers: { 'authorization': 'Bearer ' + id_token }
        })
    },

    getAllProjects: () => {
        return axios({
            url: `${SERVER_API_URL}/project/get-all`,
            method: 'GET',
            headers: { 'authorization': 'Bearer ' + id_token }
        })
    },

    getProjectDetail: (id) => {
        return axios({
            url: `${SERVER_API_URL}/project/get-project-detail?id=${id}`,
            method: 'GET',
            headers: { 'authorization': 'Bearer ' + id_token }
        })
    }
}