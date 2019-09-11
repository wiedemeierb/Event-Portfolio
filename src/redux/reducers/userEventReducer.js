const userEventReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_USEREVENT':
            return action.payload;
        default:
            return state;
    }
};

// user will be on the redux state at:
// state.userEvent
export default userEventReducer;