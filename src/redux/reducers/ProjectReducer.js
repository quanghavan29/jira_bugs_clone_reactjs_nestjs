import { DUPPLICATE_PROJECT_NAME, GET_ALL_PROJECTS_DISPATCH } from "../constants/ProjectConst";

const initialState = {
    dupplicateProjectName: '',
    message: '',
    projects: [],
    project: {id: 33, name: 'ReactJS Jira Clone'},
}

const ProjectReducer = (state = initialState, action) => {
    switch (action.type) {

        case DUPPLICATE_PROJECT_NAME: {
            const { value, message } = action;
            state.dupplicateProjectName = value;
            state.message = message;

            return { ...state };
        };

        case GET_ALL_PROJECTS_DISPATCH: {
            const {projects} = action;
            state.projects = [...projects];

            return {...state};
        };

        case 'GET_PROJECT_DETAIL_BOARD': {
            return {...state, project: action.project};
        }

        default:
            return state
    }
}

export default ProjectReducer;
