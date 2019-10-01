import {configureStore, getDefaultMiddleware} from 'redux-starter-kit';

import userReducer from './reducers/user';
import todosReducer from './reducers/todos';

const store = configureStore({
  reducer: {user: userReducer, todos: todosReducer},
  middleware: [...getDefaultMiddleware()],
});

export default store;
