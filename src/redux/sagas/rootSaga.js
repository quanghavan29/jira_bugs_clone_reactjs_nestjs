/*
    redux: 2 loại function
    loại 1: action => object => object (action thường)
    loại 2: action => function (thường dùng để xử lí api hoạc call other actions)
*/
import { all } from 'redux-saga/effects';

import * as LoginSaga from './AuthSaga/LoginSaga';

export function* rootSaga() {
    yield all([
        LoginSaga.loginEventListener(),
    ])
}