import axios from "axios"
import { ACCESS_TOKEN, SERVER_API_URL } from "../../util/config/constants"
const id_token = localStorage.getItem(ACCESS_TOKEN);

export const taskService = {
    createTask: (newTask) => {
        return axios({
            url: `${SERVER_API_URL}/task/create-task`,
            method: 'POST',
            data: { ...newTask, createdBy: 'Anonymous' },
            headers: { 'authorization': 'Bearer ' + id_token }
        })
    },

    getAllTasksByProject: (projectId, status) => {
        return axios({
            url: `${SERVER_API_URL}/task/get-all-by-project?projectId=${projectId}&status=${status}`,
            method: 'GET',
            headers: { 'authorization': 'Bearer ' + id_token }
        })
    },

    getTaskDetail: (taskId) => {
        return axios({
            url: `${SERVER_API_URL}/task/get-task-detail?id=${taskId}`,
            method: 'GET',
            headers: { 'authorization': 'Bearer ' + id_token }
        })
    },

    updateTask: (taskUpdate) => {
        return axios({
            url: `${SERVER_API_URL}/task/update`,
            method: 'PUT',
            data: taskUpdate,
            headers: { 'authorization': 'Bearer ' + id_token }
        })
    },
}