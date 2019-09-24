import addEventUserReducer from './addEventUserReducer';

//describe groups our test together - organization purposes
describe('Testing addEventUserReducer states', () => {
    test('should have its correct initial state', () => {
        //calling addEventUserReducer function, no dispatch, but need action
        //taking in dummy action for testing
        let action = {};
        //passing in action from above
        //can do undefined or null, because undefined/null is natural state of reducer
        let newState = addEventUserReducer(undefined, action);
        expect(newState).toEqual([]);
    });
    test('Should have state as action.payload', () => {
        //need to give it a type as its action.type
        let action = {
            type: 'SET_ALLEVENTUSERS',
            payload: [1, 2, 3, 4],
        };
        let newState = addEventUserReducer(undefined, action);
        //create your expectations first
        expect(newState).toEqual(action.payload)
    })
})


// const addEventUserReducer = (state = [], action) => {
//     switch (action.type) {
//         case 'SET_ALLEVENTUSERS':
//             return action.payload;
//         default:
//             return state;
//     }
// };

// //state.addEventUser
// export default addEventUserReducer;