import React, { useState, useEffect, useCallback, createContext } from 'react';
import { useDispatch } from 'react-redux';
import io from 'socket.io-client';
import Loader from 'react-loaders';
import { useApolloClient, useLazyQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

import FormLogin from './components/FormLogin';
import UserFrontPage from './components/UserFrontPage';

import './App.scss';

const SocketContext = createContext();

const useSocketListener = dispatch => {
  const [socket] = useState(() => {
    const socketServer = io.connect('http://localhost:3333');
    socketServer.on('TODO#CREATE', todo =>
      dispatch({ type: 'TODO#CREATE', todo })
    );

    socketServer.on('TODO#TOGGLE', todoId =>
      dispatch({ type: 'TODO#TOGGLE', todoId })
    );

    socketServer.on('TODO#DELETE', todoId =>
      dispatch({ type: 'TODO#DELETE', todoId })
    );

    return socketServer;
  });

  return socket;
};

const TOKEN_VALIDATE = gql`
  query tokenValidate {
    tokenValidate {
      username
      userId
    }
  }
`;

const isTokenValid = response => {
  if (!response) return false;
  const user = response.tokenValidate;
  return !!user;
};

const useTokenValidation = socket => {
  const [userChecked, setUserChecked] = useState(false);
  const [validate, { loading, error, data }] = useLazyQuery(TOKEN_VALIDATE, {
    fetchPolicy: 'network-only'
  });

  useEffect(() => {
    validate();
  }, []);

  useEffect(() => {
    if (!data) return;
    const user = data.tokenValidate;
    if (user && user.userId) {
      socket.emit('join', user.userId);
      setUserChecked(true);
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      setUserChecked(true);
    }
  }, [error]);

  return [isTokenValid(data), userChecked];
};

function App() {
  const dispatch = useDispatch();
  const socket = useSocketListener(dispatch);
  const [tokenValid, tokenChecked] = useTokenValidation(socket);
  const [userLogged, setUserLogged] = useState(false);

  if (!tokenChecked) {
    document.body.style.overflow = 'hidden';
    return <Loader type="pacman" style={{ transform: 'scale(2)' }} />;
  }

  document.body.style.overflow = 'auto';
  const component = (userLogged || tokenValid) ? (
    <UserFrontPage setUserLogged={setUserLogged} />
  ) : (
    <FormLogin setUserLogged={setUserLogged} />
  );

  return (
    <SocketContext.Provider value={socket}>{component}</SocketContext.Provider>
  );
}

export { SocketContext };
export default App;
