import { call, put, takeLatest } from "redux-saga/effects";
import { projectCategoryService } from "../../../services/ProjectCategoryService/ProjectCategoryService";
import { GET_ALL_PROJECT_CATEGORY_DISPATCH_REDUCER, GET_ALL_PROJECT_CATEGORY_SAGA } from "../../constants/ProjectCategoryConst";
import { STATUS_CODE } from "../../../util/config/constants";

function* getAllProjectCategorySaga(action) {
    try {
        const { data, status } = yield call(() => projectCategoryService.getAllProjectCategory());

        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_ALL_PROJECT_CATEGORY_DISPATCH_REDUCER,
                projectCategories: data,
            });
        }

    } catch (error) {
        console.log('Error Get All Project Category Saga: ', error);
    }
}

export function* porjectCategoryEventListener() {
    yield takeLatest(GET_ALL_PROJECT_CATEGORY_SAGA, getAllProjectCategorySaga);
}