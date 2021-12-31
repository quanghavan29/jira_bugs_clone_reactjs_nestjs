import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { call, delay, put, takeLatest } from "redux-saga/effects";
import { projectService } from "../../../services/ProjectService/ProjectService";
import { taskService } from "../../../services/TaskService/TaskService";
import { STATUS_CODE } from "../../../util/config/constants";
import { openNotification } from "../../../util/notification/notification";
import { DISPLAY_LOADING, HIDE_LOADING, LOADING_DELAY } from "../../constants/LoadingConst";
import { GET_PROJECT_BOARD_SAGA } from '../../constants/ProjectConst';
import { CREATE_TASK_SAGA, GET_ALL_TASKS_BY_PROJECT_SAGA, GET_TASK_DETAIL_SAGA, SHOW_CREATE_TASK_MODAL_SAGA, UPDATE_TASK_SAGA, UPDATE_TASK_STATUS_SAGA } from "../../constants/TaskConst";

function* showCreateTaskModalSaga(action) {
    try {
        const projects = yield call(() => projectService.getAllProjectsForSelect());

        yield put({
            type: 'SHOW_CREATE_TASK_MODAL',
            projects: projects.data,
        })
    } catch (error) {
        console.log('Error Create Task Saga: ', error);
    }
}


function* createTaskSaga(action) {

    yield put({
        type: 'HIDDEN_CREATE_TASK_MODAL',
    })

    yield put({
        type: DISPLAY_LOADING,
    });

    try {
        let project = { id: action.newTask.projectId }
        let usersAssign = action.newTask.usersAssign?.map((userId, index) => {
            return { id: userId };
        });
        let newTask = { ...action.newTask, project: project, usersAssign: usersAssign };

        const { data, status } = yield call(() => taskService.createTask(newTask));

        if (status === STATUS_CODE.CREATED) {
            openNotification('success', 'Success!', 'Task has been created!');

            yield put({
                type: GET_PROJECT_BOARD_SAGA,
                id: action.newTask.projectId,
            })

            yield put({
                type: GET_ALL_TASKS_BY_PROJECT_SAGA,
                projectId: action.newTask.projectId,
            })
        }

    } catch (error) {
        console.log('Error Create Task Saga: ', error);
        openNotification('error', 'Fail!', 'Internal Server Error!');
    }

    yield delay(LOADING_DELAY);

    yield put({
        type: HIDE_LOADING,
    });
}

function* getAllTasksByProjectSaga(action) {
    try {
        const { projectId } = action;

        const backLog = yield call(() => taskService.getAllTasksByProject(projectId, 'BACKLOG'));
        const selectedForDev = yield call(() => taskService.getAllTasksByProject(projectId, 'SELECTED FOR DEVELOPMENT'));
        const inProgress = yield call(() => taskService.getAllTasksByProject(projectId, 'IN PROGRESS'));
        const done = yield call(() => taskService.getAllTasksByProject(projectId, 'DONE'));

        // console.log('backLog', backLog);
        // console.log('selectedForDev', selectedForDev);
        // console.log('inProgress', inProgress);
        // console.log('done', done);

        let tasks = {
            backLog: {
                status: 'BACKLOG',
                items: backLog.data,
            },
            selectedForDev: {
                status: 'SELECTED FOR DEVELOPMENT',
                items: selectedForDev.data,
            },
            inProgress: {
                status: 'IN PROGRESS',
                items: inProgress.data,
            },
            done: {
                status: 'DONE',
                items: done.data,
            }
        }

        yield put({
            type: 'GET_ALL_TASKS_BY_PROJECT_REDUCER',
            tasks: tasks,
        })

    } catch (error) {
        console.log('Error Create Task Saga: ', error);
        openNotification('error', 'Fail!', 'Internal Server Error!');
    }
}

function* getTaskDetailSaga(action) {
    const { taskId } = action;
    try {
        const { data, status } = yield call(() => taskService.getTaskDetail(taskId));
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: 'SHOW_MODAL_VIEW_TASK',
                task: data,
            })
        }
    } catch (error) {
        console.log('Error Get Task Detail Saga: ', error);
        openNotification('error', 'Fail!', 'Internal Server Error!');
    }
}

function* updateTaskSaga(action) {
    const { taskUpdate } = action;
    try {
        yield console.log(action);
        const { data, status } = yield call(() => taskService.updateTask(taskUpdate));
        if (status === STATUS_CODE.SUCCESS) {
            // console.log('task updated: ', data);
            yield put({
                type: GET_TASK_DETAIL_SAGA,
                taskId: data.id,
            })

            yield put({
                type: GET_ALL_TASKS_BY_PROJECT_SAGA,
                projectId: data.project.id,
            })

            openNotification('success', 'Success!', 'Task has been updated!');
        }
    } catch (error) {
        console.log('Error Update Task Saga: ', error);
        openNotification('error', 'Fail!', 'Internal Server Error!');
    }
}

function* updateTaskStatusSaga(action) {
    const { taskUpdate } = action;
    
    yield put({
        type: DISPLAY_LOADING,
    });

    try {
        yield console.log(action);
        const { data, status } = yield call(() => taskService.updateTask(taskUpdate));
        if (status === STATUS_CODE.SUCCESS) {
            console.log('task updated: ', data);

            yield put({
                type: GET_ALL_TASKS_BY_PROJECT_SAGA,
                projectId: data.project.id,
            })

        }
    } catch (error) {
        console.log('Error Update Task Saga: ', error);
        openNotification('error', 'Fail!', 'Internal Server Error!');
    }

    yield delay(LOADING_DELAY);

    yield put({
        type: HIDE_LOADING,
    });
}


export function* taskEventListener() {
    yield takeLatest(SHOW_CREATE_TASK_MODAL_SAGA, showCreateTaskModalSaga);
    yield takeLatest(CREATE_TASK_SAGA, createTaskSaga);
    yield takeLatest(GET_ALL_TASKS_BY_PROJECT_SAGA, getAllTasksByProjectSaga);
    yield takeLatest(GET_TASK_DETAIL_SAGA, getTaskDetailSaga);
    yield takeLatest(UPDATE_TASK_SAGA, updateTaskSaga);
    yield takeLatest(UPDATE_TASK_STATUS_SAGA, updateTaskStatusSaga);
}