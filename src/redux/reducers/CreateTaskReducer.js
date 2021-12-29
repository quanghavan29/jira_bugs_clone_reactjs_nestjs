const initialState = {
    visible: false,
    projects: [],
}

const CreateTaskReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SHOW_CREATE_TASK_MODAL': {
            return {
                ...state,
                visible: true,
                projects: action.projects,
            }
        }

        case 'HIDDEN_CREATE_TASK_MODAL': {
            return {
                ...state,
                visible: false,
            }
        }

    default:
        return state
    }
}

export default CreateTaskReducer;