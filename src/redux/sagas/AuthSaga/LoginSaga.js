import { call, delay, put, takeLatest } from "redux-saga/effects";
import { LOGIN_DISPATCH_REDUCER, LOGIN_SAGA } from "../../constants/AuthConst";
import { authService } from '../../../services/AuthService/AuthService';
import { DISPLAY_LOADING, HIDE_LOADING, LOADING_DELAY } from "../../constants/LoadingConst";
import { ACCESS_TOKEN, STATUS_CODE, USER_LOGIN_LOCAL_STORAGE } from "../../../util/config/constants";
import { history } from "../../../util/libs/history";
import { accountService } from "../../../services/AccountService/AccountService";
import { openNotification } from "../../../util/notification/notification";

function* loginSaga(action) {
    let { userLogin } = action;

    yield put({
        type: DISPLAY_LOADING,
    });

    try {
        // call api login to retrieving token
        const { data, status } = yield call(() => authService.login(userLogin));

        // if token has been successfully created
        if (status === STATUS_CODE.CREATED) {
            localStorage.setItem(ACCESS_TOKEN, data.id_token);
            const userLogin = yield call(() => accountService.getCurrentUserLogin());
            yield put({
                type: LOGIN_DISPATCH_REDUCER,
                userLoginDispatch: userLogin.data,
            })
            localStorage.setItem(USER_LOGIN_LOCAL_STORAGE, JSON.stringify(userLogin.data));;
        }

        history.push('/project/board/33');
    } catch (error) {
        console.log('Error Login Saga: ', error);   
        openNotification('error', 'Login Fail!', 'Username or password incorrect!')
    }

    yield delay(LOADING_DELAY);

    yield put({
        type: HIDE_LOADING,
    });

}

export function* loginEventListener() {
    yield takeLatest(LOGIN_SAGA, loginSaga);
}