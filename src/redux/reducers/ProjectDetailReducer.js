const initialState = {
    visibleModalViewProject: false,
    visibleDrawerEditProject: false,
    project: {id: 33, name: 'ReactJS Jira Clone'},
}

const ProjectDetailReducer = (state = initialState, action) => {
    switch (action.type) {

        case 'SHOW_MODAL_VIEW_PROJECT':
            return { ...state, visibleModalViewProject: true, project: action.project };

        case 'CLOSE_MODAL_VIEW_PROJECT':
            return { ...state, visibleModalViewProject: false }

        case 'SHOW_DRAWER_EDIT_PROJECT': {
            return { ...state, visibleDrawerEditProject: true, project: action.project };
        }

        case 'CLOSE_DRAWER_EDIT_PROJECT': {
            return { ...state, visibleDrawerEditProject: false };
        }

        default:
            return state;
    }
}

export default ProjectDetailReducer;
