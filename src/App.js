import React, {useState, useEffect, useCallback, createContext} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import io from 'socket.io-client';
import Loader from 'react-loaders';

import FormLogin from './FormLogin';
import UserFrontPage from './UserFrontPage';

import './App.scss';

const SocketContext = createContext();

const useSocketListener = dispatch => {
  const [socket] = useState(() => {
    const socketServer = io.connect('http://localhost:3333');
    socketServer.on('TODO#CREATE', todo =>
      dispatch({type: 'TODOS#CREATE', todo}),
    );

    socketServer.on('TODO#DELETE', todoId =>
      dispatch({type: 'TODOS#DELETE', todoId}),
    );

    return socketServer;
  });

  return socket;
};

const useTokenValidation = (dispatch, socket) => {
  const [userChecked, setUserChecked] = useState(false);
  const user = useSelector(state => state.user);

  const validateToken = useCallback(async () => {
    const result = await fetch('/api/token/validate');
    if (result.ok) {
      const user = await result.json();
      socket.emit('join', user.userId);
      dispatch({type: 'LOGIN#TOKEN', user});
    }
    setUserChecked(true);
  }, [socket, dispatch]);

  useEffect(() => {
    validateToken();
  }, [validateToken]);

  return [Object.keys(user).length > 0, userChecked];
};

function App() {
  const dispatch = useDispatch();
  const socket = useSocketListener(dispatch);
  const [userLogged, userChecked] = useTokenValidation(dispatch, socket);

  if (!userChecked) {
    return <Loader type="pacman" />;
  }

  const component = userLogged ? <UserFrontPage /> : <FormLogin />;

  return (
    <SocketContext.Provider value={socket}>{component}</SocketContext.Provider>
  );
}

export {SocketContext};
export default App;
