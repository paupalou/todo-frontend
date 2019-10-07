import {createReducer} from 'redux-starter-kit';

const todosReducer = createReducer([], {
  LOGOUT: _ => [],
  'TODO#GET-ALL': (state, action) => {
    state.push(...action.todos);
  },
  'TODO#CREATE': (state, action) => {
    state.unshift(action.todo);
  },
  'TODO#TOGGLE': (state, action) => {
    const todo = state.find(item => item._id === action.todoId);
    todo.done = !todo.done;
  },
  'TODO#DELETE': (state, action) =>
    state.filter(todo => todo._id !== action.todoId),
});

export default todosReducer;
