const userAttendingEventsReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_USER_ATTENDING_EVENTS':
            return action.payload;
        default:
            return state;
    }
}

export default userAttendingEventsReducer;