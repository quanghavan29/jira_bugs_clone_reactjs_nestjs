import { call, delay, put, takeLatest } from "redux-saga/effects";
import { projectService } from "../../../services/ProjectService/ProjectService";
import { STATUS_CODE } from "../../../util/config/constants";
import { ADD_MEMBER_TO_PROJECT_SAGA, CREATE_PROJECT_SAGA, DELETE_MEMBER_FROM_PROJECT_SAGA, DELETE_PORJECT_SAGA, DUPPLICATE_PROJECT_NAME, GET_ALL_PROJECTS_DISPATCH, GET_ALL_PROJECTS_SAGA, GET_LIST_MEMBERS_SAGA, GET_PROJECT_BOARD_SAGA, GET_PROJECT_DETAIL_SAGA, UPDATE_PORJECT_SAGA } from "../../constants/ProjectConst";
import { history } from "../../../util/libs/history";
import { DISPLAY_LOADING, HIDE_LOADING, LOADING_DELAY } from "../../constants/LoadingConst";
import { openNotification } from "../../../util/notification/notification";

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
    yield put({
        type: DISPLAY_LOADING,
    });

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

    yield delay(LOADING_DELAY);

    yield put({
        type: HIDE_LOADING,
    });
}

function* getProjectDetailSaga(action) {
    try {
        const { actionDispatch, id } = action;
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

function* updateProjectSaga(action) {
    try {
        const { data, status } = yield call(() => projectService.updateProject(action.projectUpdate));

        if (status === STATUS_CODE.SUCCESS) {
            if (data.status === 400 && data.message === 'Project name already exist!') {
                openNotification('error', 'Fail!', data.message);
            } else {
                openNotification('success', 'Success!', 'Project has been updated!');

                yield put({
                    type: 'CLOSE_DRAWER_EDIT_PROJECT',
                })

                yield put({
                    type: GET_ALL_PROJECTS_SAGA,
                })

            }
        }

    } catch (error) {
        console.log('Error Update Project Saga: ', error)
        openNotification('error', 'Fail!', 'Internal Server Error!')
    }

    yield put({
        type: HIDE_LOADING,
    })
}

function* deleteProjectSaga(action) {
    try {
        if (action.createdBy === 'ADMIN' || action.createdBy === 'Member') {
            openNotification('error', 'Fail!', 'Forbidden!');
            return;
        }

        const { status } = yield call(() => projectService.deleteProject(action.id));

        if (status === STATUS_CODE.SUCCESS) {

            yield put({
                type: GET_ALL_PROJECTS_SAGA,
            })

            openNotification('success', 'Success!', 'Project has been deleted!')
        }
    } catch (error) {
        console.log('Error Delete Project Saga: ', error);
        openNotification('error', 'Fail!', 'Internal Server Error!')
    }
    yield put({
        type: HIDE_LOADING,
    })
}

function* addMemberToProjectSaga(action) {
    try {
        const { data, status } = yield call(() => projectService.addMember(action.project));

        if (status === STATUS_CODE.SUCCESS) {
            openNotification('success', 'Success!', 'Member has been inserted!');

            yield put({
                type: GET_ALL_PROJECTS_SAGA,
            })

        }
    } catch (error) {
        console.log('Error Add Member To Project Saga: ', error);
        openNotification('error', 'Fail!', 'Internal Server Error!')
    }
}

function* deleteMemberFromProjectSaga(action) {
    try {
        const { data, status } = yield call(() => projectService.deleteMember(action.project));

        if (status === STATUS_CODE.SUCCESS) {
            openNotification('success', 'Success!', 'Member has been deleted!');

            yield put({
                type: GET_ALL_PROJECTS_SAGA,
            })

        }
    } catch (error) {
        console.log('Error Add Member To Project Saga: ', error);
        openNotification('error', 'Fail!', 'Internal Server Error!')
    }
}

function* getProjectBoardSaga(action) {
    try {
        const { id } = action;
        const { data, status } = yield call(() => projectService.getProjectDetail(id));

        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: 'GET_PROJECT_DETAIL_BOARD',
                project: data,
            })
        }

    } catch (error) {
        console.log('Error Get Project Detail Saga: ', error)
    }
}

function* getListMemberSaga(action) {
    try {
        const { projectId } = action;

        const { data, status } = yield call(() => projectService.getListMembers(projectId));

        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: 'GET_LIST_MEMBERS_REDUCER',
                members: data,
            })
        }

    } catch (error) {
        console.log('Error Get Project Detail Saga: ', error)
    }
}

export function* projectEventListener() {
    yield takeLatest(CREATE_PROJECT_SAGA, createProjectSaga);
    yield takeLatest(GET_ALL_PROJECTS_SAGA, getAllProjectsSaga);
    yield takeLatest(GET_PROJECT_DETAIL_SAGA, getProjectDetailSaga);
    yield takeLatest(UPDATE_PORJECT_SAGA, updateProjectSaga);
    yield takeLatest(DELETE_PORJECT_SAGA, deleteProjectSaga);
    yield takeLatest(ADD_MEMBER_TO_PROJECT_SAGA, addMemberToProjectSaga);
    yield takeLatest(DELETE_MEMBER_FROM_PROJECT_SAGA, deleteMemberFromProjectSaga);
    yield takeLatest(GET_PROJECT_BOARD_SAGA, getProjectBoardSaga);
    yield takeLatest(GET_LIST_MEMBERS_SAGA, getListMemberSaga);
}
