import { call, put, takeLatest } from "redux-saga/effects";
import { projectService } from "../../../services/ProjectService/ProjectService";
import { STATUS_CODE } from "../../../util/config/constants";
import { CREATE_PROJECT_SAGA, DUPPLICATE_PROJECT_NAME, GET_ALL_PROJECTS_DISPATCH, GET_ALL_PROJECTS_SAGA, GET_PROJECT_DETAIL_SAGA } from "../../constants/ProjectConst";
import { history } from "../../../util/libs/history";

function* createProjectSaga(action) {
    try {
        const { newProject } = action;
        const { data, status } = yield call(() => projectService.createProject(newProject));
        // check authorized (status = 401)
        // if (status === STATUS_CODE.UN_AUTHORIZED) {
        //     history.push('/login');
        // }

        // if project name already exist (status = 400)
        if (data.status === 400) {
            yield put({
                type: DUPPLICATE_PROJECT_NAME,
                value: 'true',
                message: 'Project name already exist!',
            });
        } else if (status === STATUS_CODE.CREATED) {
            yield put({
                type: DUPPLICATE_PROJECT_NAME,
                value: 'false',
                message: 'Create Project Successfully!',
            });
        }
    } catch (error) {
        console.log('Error Create Project Saga: ', error);
    }
}

function* getAllProjectsSaga(action) {
    try {
        const { data, status } = yield call(() => projectService.getAllProjects());
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_ALL_PROJECTS_DISPATCH,
                projects: data,
            })
        }
    } catch (error) {
        console.log('Error Get All Projects Saga: ', error)
    }
}

function* getProjectDetail(action) {
    try {
        const {actionDispatch, id} = action;
        const { data, status } = yield call(() => projectService.getProjectDetail(id));

        if (status === STATUS_CODE.SUCCESS) {
            if (actionDispatch === 'VIEW_PROJECT') {
                yield put({
                    type: 'SHOW_MODAL_VIEW_PROJECT',
                    project: data,
                })
            }

            if (actionDispatch === 'EDIT_PROJECT') {
                yield put({
                    type: 'SHOW_DRAWER_EDIT_PROJECT',
                    project: data,
                })
            }
        }

    } catch (error) {
        console.log('Error Get Project Detail Saga: ', error)
    }
}

export function* projectEventListener() {
    yield takeLatest(CREATE_PROJECT_SAGA, createProjectSaga);
    yield takeLatest(GET_ALL_PROJECTS_SAGA, getAllProjectsSaga);
    yield takeLatest(GET_PROJECT_DETAIL_SAGA, getProjectDetail);
}
