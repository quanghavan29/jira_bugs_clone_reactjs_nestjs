import { call, delay, put, takeLatest } from "redux-saga/effects";
import { LOGIN_DISPATCH_REDUCER, LOGIN_SAGA } from "../../constants/AuthConst";
import { authService } from '../../../services/AuthService/AuthService';
import { DISPLAY_LOADING, HIDE_LOADING } from "../../constants/LoadingConst";
import { ACCESS_TOKEN, USER_LOGIN_LOCAL_STORAGE } from "../../../util/config/constants";
import { history } from "../../../util/libs/history";

function* loginSaga(action) {
    let { userLogin } = action;

    yield put({
        type: DISPLAY_LOADING,
    });

    yield delay(500);

    try {
        const { data, status } = yield call(() => authService.login(userLogin));
        localStorage.setItem(ACCESS_TOKEN, data.content.accessToken);
        localStorage.setItem(USER_LOGIN_LOCAL_STORAGE, JSON.stringify(data.content));;

        yield put({
            type: LOGIN_DISPATCH_REDUCER,
            userLoginDispatch: data.content, 
            status,
        })

        history.push('/home');
    } catch (error) {
        console.log('Error Login Saga: ', error);
    }
    yield put({
        type: HIDE_LOADING,
    });

}

export function* loginEventListener() {
    yield takeLatest(LOGIN_SAGA, loginSaga);
}