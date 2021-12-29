const initialState = {
    visible: false,
    task: {}
}

const ViewTaskReducer = (state = initialState, action) => {
    switch (action.type) {

        case 'SHOW_MODAL_VIEW_TASK': {
            return { ...state, visible: true, task: action.task };
        }

        case 'CLOSE_MODAL_VIEW_TASK': {
            return { ...state, visible: false };
        }

        default:
            return state
    }
}

export default ViewTaskReducer;
