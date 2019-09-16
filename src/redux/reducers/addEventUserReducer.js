const addEventUserReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_ALLEVENTUSERS':
            return action.payload;
        default:
            return state;
    }
};

//state.addEventUser
export default addEventUserReducer;