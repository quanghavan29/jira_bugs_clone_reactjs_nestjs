import { call, takeLatest,put } from "redux-saga/effects";
import { userService } from "../../../services/UserService/UserService";
import { openNotification } from "../../../util/notification/notification";
import { SEARCH_USER_SAGA } from "../../constants/UserConst";
import { STATUS_CODE } from "../../../util/config/constants";
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

export function* userEventListener() {
    yield takeLatest(SEARCH_USER_SAGA, searchUserSaga);
}