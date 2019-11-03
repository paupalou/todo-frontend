import React, { useEffect, useState, useContext, useCallback } from 'react';
import {
  useApolloClient,
  useQuery,
  useLazyQuery,
  useMutation
} from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

import { SocketContext } from './../App';
import TopBar from './TopBar';
import ToDoList from './ToDoList';
import NewTodo from './NewTodo';

const LOGOUT = gql`
  query {
    logout
  }
`;

const GET_TODOS = gql`
  query {
    getUserTodos {
      id
      title
      text
      created
      done
    }
  }
`;

const DELETE_TODO = gql`
  mutation deleteTodo($id: String!) {
    deleteTodo(id: $id) {
      id
    }
  }
`;

function UserFrontPage({ setUserLogged }) {
  const socket = useContext(SocketContext);

  const [todos, setTodos] = useState([]);
  const { data: todosData } = useQuery(GET_TODOS, {
    fetchPolicy: 'network-only'
  });

  useEffect(() => {
    if (todosData) {
      setTodos(todosData.getUserTodos);
    }
  }, [todosData]);

  const [deleteTodo, { data: deleteData }] = useMutation(DELETE_TODO);

  useEffect(() => {
    if (!deleteData) return;
    const { deleteTodo } = deleteData;
    if (deleteTodo && deleteTodo.id) {
      setTodos(t => t.filter(todo => todo.id !== deleteTodo.id));
    }
  }, [deleteData]);

  const client = useApolloClient();
  const { tokenValidate: user } = client.readQuery({
    query: gql`
      query GetUser {
        tokenValidate {
          id
          username
        }
      }
    `
  });

  console.log(user);

  const [logout, { data: logoutData }] = useLazyQuery(LOGOUT, {
    fetchPolicy: 'network-only'
  });

  useEffect(() => {
    if (logoutData) {
      socket.emit('leave', user.id);
      setUserLogged(false);

      client.writeData({
        data: {
          tokenValidate: {
            id: undefined,
            username: undefined
          }
        }
      });
    }
  }, [logoutData, setUserLogged, user, socket, client]);

  const toggleTodo = todoId => fetch(`/api/todos/${todoId}`, { method: 'PUT' });

  return (
    <>
      <TopBar username={user.username} logout={logout} />
      <ToDoList todos={todos} deleteTodo={deleteTodo} toggleTodo={toggleTodo} />
      <NewTodo />
    </>
  );
}

export default UserFrontPage;
