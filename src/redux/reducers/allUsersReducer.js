const allUsersReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_ALLUSERS':
            return action.payload;
        default:
            return state;
    }
};

//user will be on the redux state at:
// state.allUsers
export default allUsersReducer;