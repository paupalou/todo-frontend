import {createReducer} from 'redux-starter-kit';

const userReducer = createReducer(
  {},
  {
    'SOCKET-CONNECTED': state => {
      state.socketConnected = true;
    },
    'USE-TOKEN': (state, action) => {
      state.user = action.user;
    },
    LOGIN: (state, action) => {
      state.user = action.user;
    },
  },
);

export default userReducer;
