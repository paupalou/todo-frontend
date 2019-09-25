import {createReducer} from 'redux-starter-kit';

const userReducer = createReducer(
  {},
  {
    'SOCKET-CONNECTED': state => {
      state.socketConnected = true;
    },
    LOGIN: (state, action) => {
      console.log('WOOT');
      state.user = action.user;
    },
  },
);

export default userReducer;
