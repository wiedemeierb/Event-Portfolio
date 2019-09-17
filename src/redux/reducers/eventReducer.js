const eventReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_EVENT':
            return action.payload;
        default:
            return state;
    }};

// state.userEvent
export default eventReducer;