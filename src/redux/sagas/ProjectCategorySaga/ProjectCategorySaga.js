import { call, put, takeLatest } from "redux-saga/effects";
import { projectCategoryService } from "../../../services/ProjectCategoryService/ProjectCategoryService";
import { GET_ALL_PROJECT_CATEGORY_DISPATCH_REDUCER, GET_ALL_PROJECT_CATEGORY_SAGA } from "../../constants/ProjectCategoryConst";

function * getAllProjectCategorySaga(action) {
    try {
        console.log('get all project category ', action);

        const response = yield call(() => projectCategoryService.getAllProjectCategory());
        yield put({
            type: GET_ALL_PROJECT_CATEGORY_DISPATCH_REDUCER,
            projectCategories: response.data.content,
        });

    } catch (error) {
        console.log('Error Get All Project Category Saga: ', error);
    }
}

export function * porjectCategoryEventListener() {
    yield takeLatest(GET_ALL_PROJECT_CATEGORY_SAGA, getAllProjectCategorySaga);
}