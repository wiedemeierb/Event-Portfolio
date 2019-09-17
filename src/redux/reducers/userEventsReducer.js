const userEventsReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_USEREVENTS':
            return action.payload;
        default:
            return state;
    }};

// state.userEvent
export default userEventsReducer;