/*
    redux: 2 loại function
    loại 1: action => object => object (action thường)
    loại 2: action => function (thường dùng để xử lí api hoạc call other actions)
*/
import { all } from 'redux-saga/effects';

import * as LoginSaga from './AuthSaga/LoginSaga';
import * as ProjectCategorySaga from './ProjectCategorySaga/ProjectCategorySaga';
import * as ProjectSaga from './ProjectSaga/ProjectSaga';

export function* rootSaga() {
    yield all([
        // Auth
        LoginSaga.loginEventListener(),

        // Project Category
        ProjectCategorySaga.porjectCategoryEventListener(),

        // Project
        ProjectSaga.projectEventListener(),
    ])
}