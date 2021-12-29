const initialState = {
    members: []
}

const ListMembersReducer = (state = initialState, action) => {
    switch (action.type) {

        case 'GET_LIST_MEMBERS_REDUCER': {
            return { ...state, members: action.members }
        }

        default:
            return state
    }
}

export default ListMembersReducer;