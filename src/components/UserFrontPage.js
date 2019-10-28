import React, { useEffect, useCallback, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useApolloClient } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

import { SocketContext } from './../App';
import TopBar from './TopBar';
import ToDoList from './ToDoList';
import NewTodo from './NewTodo';

function UserFrontPage({ setUserLogged }) {
  const socket = useContext(SocketContext);
  const client = useApolloClient();
  const { user } = client.readQuery({
    query: gql`
      query GetUser {
        user {
          username
          userId
        }
      }
    `
  });

  const todos = useSelector(state => state.todos);
  const dispatch = useDispatch();

  const fetchTodos = useCallback(async () => {
    const request = await fetch('/api/todos');
    if (request.ok) {
      const userTodos = await request.json();
      dispatch({ type: 'TODO#GET-ALL', todos: userTodos });
    }
  }, [dispatch]);

  const deleteTodo = todoId =>
    fetch(`/api/todos/${todoId}`, {
      method: 'DELETE'
    });

  const toggleTodo = todoId => fetch(`/api/todos/${todoId}`, { method: 'PUT' });

  const logout = async () => {
    const request = await fetch('/api/logout');
    if (request.ok) {
      socket.emit('leave', user.userId);
      dispatch({ type: 'LOGOUT' });
    }
    setUserLogged(false);
  };

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  return (
    <>
      <TopBar username={user.username} logout={logout} />
      <ToDoList todos={todos} deleteTodo={deleteTodo} toggleTodo={toggleTodo} />
      <NewTodo />
    </>
  );
}

export default UserFrontPage;
