const userReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_USER':
      return action.payload;
    case 'UNSET_USER':
      return [];
    default:
      return state;
  }};

// state.user
export default userReducer;
