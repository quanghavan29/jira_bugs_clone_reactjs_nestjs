import { takeLatest, call, put } from "@redux-saga/core/effects";
import { commentService } from "../../../services/CommentService/CommentService";
import { STATUS_CODE } from "../../../util/config/constants";
import { openNotification } from "../../../util/notification/notification";
import { CREATE_COMMENT_SAGA, DELETE_COMMENT_SAGA } from "../../constants/CommentConts";
import { GET_TASK_DETAIL_SAGA } from "../../constants/TaskConst";

function* createCommentSaga(action) {
    try {
        yield console.log(action);
        const {data, status} = yield call(() => commentService.createComment(action.newComment));
        if (status === STATUS_CODE.CREATED) {
            yield put({
                type: GET_TASK_DETAIL_SAGA,
                taskId: data.task.id,
            })
        }
    } catch (error) {
        console.log('Error Create Comment Saga: ', error);
        openNotification('error', 'Fail!', 'Internal Server Error!');
    }
}

function* deleteCommentSaga(action) {
    try {
        yield console.log(action);
        const {data, status} = yield call(() => commentService.deleteComment(action.commentId));

        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_TASK_DETAIL_SAGA,
                taskId: action.taskId,
            })
        }
    } catch (error) {
        console.log('Error Delete Comment Saga: ', error);
        openNotification('error', 'Fail!', 'Internal Server Error!');
    }
}

export function* commentEventListener() {
    yield takeLatest(CREATE_COMMENT_SAGA, createCommentSaga);
    yield takeLatest(DELETE_COMMENT_SAGA, deleteCommentSaga);
}