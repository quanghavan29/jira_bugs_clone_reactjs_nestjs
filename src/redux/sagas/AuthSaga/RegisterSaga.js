import { call, delay, put, takeLatest } from "redux-saga/effects";
import { authService } from "../../../services/AuthService/AuthService";
import { STATUS_CODE } from "../../../util/config/constants";
import { history } from "../../../util/libs/history";
import { openNotification } from "../../../util/notification/notification";
import { REGISTER_SAGA } from "../../constants/AuthConst";
import { DISPLAY_LOADING, HIDE_LOADING, LOADING_DELAY } from "../../constants/LoadingConst";

function* registerSaga(action) {

    let { userRegister } = action;

    try {
        yield put({
            type: DISPLAY_LOADING,
        });

        const { data, status } = yield call(() => authService.register(userRegister));

        yield delay(LOADING_DELAY);

        yield put({
            type: HIDE_LOADING,
        });

        if (data.status === 400 && data.message === 'Username already exists!') {
            openNotification('error', 'Register Fail!', 'Username already exists!');
        } else {
            // if account created successfully (status = 201)
            if (status === STATUS_CODE.CREATED) {
                history.push('/login');
                openNotification('success', 'Success!', 'Your account has been successfully created!');
            }
        }
    } catch (error) {
        console.log('Error Register Saga: ', error);
        openNotification('error', 'Fail!', 'Internal Server Error!')
    }

}

export function* registerEventListener() {
    yield takeLatest(REGISTER_SAGA, registerSaga);
}