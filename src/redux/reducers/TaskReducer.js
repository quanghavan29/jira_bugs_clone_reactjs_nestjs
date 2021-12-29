const items = [];

const initialState = {
    tasks: {
        backLog: {
            status: 'BACKLOG',
            items: items,
        },
        selectedForDev: {
            status: 'SELECTED FOR DEVELOPMENT',
            items: items,
        },
        inProgress: {
            status: 'IN PROGRESS',
            items: items,
        },
        done: {
            status: 'DONE',
            items: items,
        }
    }
}

const TaskReducer = (state = initialState, action) => {
    switch (action.type) {

        case 'GET_ALL_TASKS_BY_PROJECT_REDUCER': {
            return {...state, tasks: action.tasks};
        }

        default:
            return state
    }
}

export default TaskReducer;