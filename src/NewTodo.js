import React, { useState } from 'react';

function NewTodo() {
  const [todoTitle, setTodoTitle] = useState();
  const [todoText, setTodoText] = useState();

  const createTodo = async event => {
    event.preventDefault();
    await fetch('/api/todos', {
      method: 'POST',
      body: JSON.stringify({ title: todoTitle, text: todoText }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  return (
    <form onSubmit={createTodo}>
      title <input type="text" onChange={(e) => setTodoTitle(e.target.value)} />
      text <input type="text" onChange={(e) => setTodoText(e.target.value)} />
      <button type="submit">create</button>
    </form>
  );
}

export default NewTodo;
