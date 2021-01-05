const ADD_USER = 'ADD_USER';

let initialState = {
  currentUser: null
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER:
      return {...state, currentUser: action.user};
    default:
      return state;
  }
};

export const addUserAC = user => {
    return{
        type: ADD_USER,
        user
    }
}

export default userReducer;
