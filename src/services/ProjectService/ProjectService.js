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
    },

    updateProject: (projectUpdate) => {
        return axios({
            url: `${SERVER_API_URL}/project/update`,
            method: 'PUT',
            data: projectUpdate,
            headers: { 'authorization': 'Bearer ' + id_token }
        })
    },

    deleteProject: (id) => {
        return axios({
            url: `${SERVER_API_URL}/project/delete?id=${id}`,
            method: 'DELETE',
            headers: { 'authorization': 'Bearer ' + id_token }
        })
    },

    addMember: (data) => {
        return axios({
            url: `${SERVER_API_URL}/project/add-member`,
            method: 'PUT',
            data: data,
            headers: { 'authorization': 'Bearer ' + id_token }
        })
    },

    deleteMember: (data) => {
        return axios({
            url: `${SERVER_API_URL}/project/delete-member`,
            method: 'PUT',
            data: data,
            headers: { 'authorization': 'Bearer ' + id_token }
        })
    },

    getAllProjectsForSelect: () => {
        return axios({
            url: `${SERVER_API_URL}/project/get-all-project-for-select`,
            method: 'GET',
            headers: { 'authorization': 'Bearer ' + id_token }
        })
    },

    getListMembers: (projectId) => {
        return axios({
            url: `${SERVER_API_URL}/project/list-members?projectId=${projectId}`,
            method: 'GET',
            headers: { 'authorization': 'Bearer ' + id_token }
        })
    }

}