import axios from "axios"
import { ACCESS_TOKEN, SERVER_API_URL } from "../../util/config/constants"
const id_token = localStorage.getItem(ACCESS_TOKEN);

export const commentService = {
    createComment: (newComment) => {
        return axios({
            url: `${SERVER_API_URL}/comment/create-comment`,
            method: 'POST',
            data: { ...newComment, createdBy: 'Anonymous' },
            headers: { 'authorization': 'Bearer ' + id_token }
        })
    },

    deleteComment: (commentId) => {
        return axios({
            url: `${SERVER_API_URL}/comment/delete?id=${commentId}`,
            method: 'DELETE',
            headers: { 'authorization': 'Bearer ' + id_token }
        })
    },

}