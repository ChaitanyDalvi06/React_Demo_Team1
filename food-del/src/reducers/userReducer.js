// src/reducers/userReducer.js
const initialState = {
  users: []
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    // Define your user-related actions here
    default:
      return state;
  }
}

export default userReducer;
