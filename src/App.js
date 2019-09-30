import React, {useState, useEffect, useCallback} from 'react';
import {useDispatch} from 'react-redux';
import io from 'socket.io-client';
import Loader from 'react-loaders';

import FormLogin from './FormLogin';
import UserFrontPage from './UserFrontPage';

import './App.scss';

const useSocketListener = () => {
  const dispatch = useDispatch();

  const reportSocketConnection = useCallback(
    () => dispatch({type: 'SOCKET-CONNECTED'}),
    [dispatch],
  );

  const reportLogin = useCallback(user => dispatch({type: 'LOGIN', user}), [
    dispatch,
  ]);

  const reportTokenUse = useCallback(
    user => dispatch({type: 'USE-TOKEN', user}),
    [dispatch],
  );

  useEffect(() => {
    const socket = io.connect('http://localhost:3333');
    socket.on('ACTION/SOCKET-CONNECTED', _ => reportSocketConnection());
    socket.on('ACTION/LOGIN', ({user}) => reportLogin(user));
    socket.on('ACTION/USE-TOKEN', ({user}) => reportTokenUse(user));
  }, [reportLogin, reportSocketConnection, reportTokenUse]);
};

const useTokenValidation = () => {
  const [userLogged, setUserLogged] = useState();
  const validateToken = async () => {
    const result = await fetch('/api/token/validate');
    setTimeout(() => setUserLogged(result.ok), 2000);
  };

  useEffect(() => {
    validateToken();
  }, []);

  return userLogged;
};

function App() {
  useSocketListener();
  const userLogged = useTokenValidation();

  if (typeof userLogged === 'undefined') {
    return <Loader type="pacman" />;
  }

  if (userLogged) {
    return <UserFrontPage />;
  }

  return <FormLogin />;
}

export default App;
