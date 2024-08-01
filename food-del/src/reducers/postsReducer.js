// src/reducers/postsReducer.js
const initialState = {
    posts: []
  };
  
  function postsReducer(state = initialState, action) {
    switch (action.type) {
      // Define your post-related actions here
      default:
        return state;
    }
  }
  
  export default postsReducer;
  