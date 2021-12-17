import { GET_ALL_PROJECT_CATEGORY_DISPATCH_REDUCER } from "../constants/ProjectCategoryConst";

const initialState = {
    projectCategories: [
        // {id: 'web_app', name: "Web Application"},
        // {id: 'mobile_app', name: "Mobile Application"},
    ],
}

const ProjectCategoryReducer = (state = initialState, action) => {
    switch (action.type) {
    case GET_ALL_PROJECT_CATEGORY_DISPATCH_REDUCER: {
        state.projectCategories = action.projectCategories;
        return {...state};
    }
    default:
        return state
    }
}

export default ProjectCategoryReducer;