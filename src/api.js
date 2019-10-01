const validateToken = socket => async dispatch => {
  const result = await fetch('/api/token/validate');
  if (result.ok) {
    const user = await result.json();
    socket.emit('join', user.userId);
    dispatch({type: 'LOGIN#TOKEN', user});
  }

  const request = await fetch('/api/todos');
  if (request.ok) {
    const userTodos = await request.json();
    dispatch({type: 'TODOS#GET', todos: userTodos});
  }
  // setUserChecked(true);
};

export default validateToken;
