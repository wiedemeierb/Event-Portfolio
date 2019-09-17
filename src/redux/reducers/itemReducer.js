const itemReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_ITEMS':
            return action.payload;
        default:
            return state;
    }};

// state.items
export default itemReducer;