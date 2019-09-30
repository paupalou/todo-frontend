import React, {useState, useEffect} from 'react';

function UserFrontPage() {
  const [todos, setTodos] = useState([]);
  const fetchTodos = async () => {
    const request = await fetch('/api/todos');
    if (request.ok) {
      const userTodos = await request.json();
      setTodos(userTodos);
    }
  };

  const deleteTodo = async (todoId) => {
    const request = await fetch(`/api/todos/${todoId}`, {
      method: 'DELETE'
    });

    if (request.ok) {
      setTodos(todos.filter(todo => todo._id !== todoId));
    }
  }

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div>
      User Front Page
      <p>TODOS</p>
      <ul>
        {todos.map(todo => (
          <li>
            {todo.title}
            <button onClick={() => deleteTodo(todo._id)}>delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserFrontPage;
