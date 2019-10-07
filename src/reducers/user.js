import { createReducer } from 'redux-starter-kit';

const reportUser = (state, action) => {
  const { userId, username } = action.user;
  state.userId = userId;
  state.username = username;
};

const userReducer = createReducer(
  {},
  {
    LOGOUT: _ => ({}),
    'LOGIN#USERNAME': reportUser,
    'LOGIN#TOKEN': reportUser
  }
);

export default userReducer;
