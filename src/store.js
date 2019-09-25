import { configureStore, getDefaultMiddleware } from 'redux-starter-kit';
import userReducer from './reducers/user';

const store = configureStore({
  reducer: userReducer,
  middleware: [...getDefaultMiddleware()]
});

export default store;
