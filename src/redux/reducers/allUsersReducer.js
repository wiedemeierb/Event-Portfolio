const allUsersReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_ALLUSERS':
            return action.payload;
        default:
            return state;
    }};

// state.allUsers
export default allUsersReducer;