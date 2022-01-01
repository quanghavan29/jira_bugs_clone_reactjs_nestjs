import { call, takeLatest, put } from "redux-saga/effects";
import { userService } from "../../../services/UserService/UserService";
import { openNotification } from "../../../util/notification/notification";
import { SEARCH_USER_SAGA, UPDATE_USER_SAGA, UPLOAD_AVATAR_USER_SAGA } from "../../constants/UserConst";
import { STATUS_CODE, USER_LOGIN_LOCAL_STORAGE } from "../../../util/config/constants";
import { DISPATCH_USERS_SEARCHED_ON_REDUCER } from "../../constants/UserConst";

function* searchUserSaga(action) {
    try {
        const { data, status } = yield call(() => userService.searhUser(action.username));

        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: DISPATCH_USERS_SEARCHED_ON_REDUCER,
                usersSearched: data,
            })
        }

    } catch (error) {
        console.log('Error Search User Saga: ', error);
        openNotification('error', 'Fail!', 'Internal Server Error!')
    }
}

function* updateUserSaga(action) {
    try {
        yield console.log(action);
        const {data, status} = yield call(() => userService.updateUser(action.userUpdate));
        if (status === STATUS_CODE.SUCCESS) {
            localStorage.setItem(USER_LOGIN_LOCAL_STORAGE, JSON.stringify(data));
        }
        openNotification('success', 'Success!', 'Your account has been updated!');
    } catch (error) {
        console.log('Error Update User Saga: ', error);
        openNotification('error', 'Fail!', 'Internal Server Error!')
    }
}

function* uploadAvatarUserSaga(action) {
    try {
        yield console.log(action);
        openNotification('success', 'Success!', 'Your avatar has been uploaded!');
    } catch (error) {
        console.log('Error Update Avatar User Saga: ', error);
        openNotification('error', 'Fail!', 'Internal Server Error!')
    }
}

export function* userEventListener() {
    yield takeLatest(SEARCH_USER_SAGA, searchUserSaga);
    yield takeLatest(UPDATE_USER_SAGA, updateUserSaga);
    yield takeLatest(UPLOAD_AVATAR_USER_SAGA, uploadAvatarUserSaga);
}