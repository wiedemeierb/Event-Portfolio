const eventReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_EVENT':
            return action.payload;
        default:
            return state;
    }
};

// user will be on the redux state at:
// state.userEvent
export default eventReducer;