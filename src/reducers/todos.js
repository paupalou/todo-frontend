import {createReducer} from 'redux-starter-kit';

const todosReducer = createReducer(
  [],
  {
    LOGOUT: _ => [],
    'TODOS#GET': (state, action) => {
      state.push(...action.todos);
    },
    'TODOS#CREATE': (state, action) => {
      state.push(action.todo);
    },
    'TODOS#DELETE': (state, action) => state.filter(todo => todo._id !== action.todoId),
  },
);

export default todosReducer;
