/*
    redux: 2 loại function
    loại 1: action => object => object (action thường)
    loại 2: action => function (thường dùng để xử lí api hoạc call other actions)
*/
import { all } from 'redux-saga/effects';

import * as LoginSaga from './AuthSaga/LoginSaga';
import * as RegisterSaga from './AuthSaga/RegisterSaga';
import * as ProjectCategorySaga from './ProjectCategorySaga/ProjectCategorySaga';
import * as ProjectSaga from './ProjectSaga/ProjectSaga';
import * as UserSaga from './UserSaga/UserSaga';
import * as TaskSaga from './TaskSaga/TaskSaga';
import * as CommentSaga from './CommentSaga/CommentSaga';

export function* rootSaga() {
    yield all([
        // Auth
        LoginSaga.loginEventListener(),
        RegisterSaga.registerEventListener(),

        // Project Category
        ProjectCategorySaga.porjectCategoryEventListener(),
        // Project
        ProjectSaga.projectEventListener(),
        // User
        UserSaga.userEventListener(),
        // Task
        TaskSaga.taskEventListener(),
        // Comment
        CommentSaga.commentEventListener(),
    ])
}