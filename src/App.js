import React, { useState, useEffect, createContext } from 'react';
import io from 'socket.io-client';
import Loader from 'react-loaders';
import { useQuery, useApolloClient } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

import FormLogin from './components/FormLogin';
import UserFrontPage from './components/UserFrontPage';

import './App.scss';

const SocketContext = createContext();

const useSocketListener = () => {
  const [socket] = useState(() => {
    const socketServer = io.connect('http://localhost:3333');
    socketServer.on(
      'TODO#CREATE',
      todo => console.log('[todo created]: ', todo)
      // dispatch({ type: 'TODO#CREATE', todo })
    );

    socketServer.on(
      'TODO#TOGGLE',
      todoId => console.log('[todo toggled]: ', todoId)
      // dispatch({ type: 'TODO#TOGGLE', todoId })
    );

    socketServer.on(
      'TODO#DELETE',
      todoId => console.log('[todo deleted]: ', todoId)
      // dispatch({ type: 'TODO#DELETE', todoId })
    );

    return socketServer;
  });

  return socket;
};

const TOKEN_VALIDATE = gql`
  query LoggedUser {
    tokenValidate {
      id
      username
    }
  }
`;

const useAuth = socket => {
  const [userLogged, setUserLogged] = useState();
  const { loading, error, data } = useQuery(TOKEN_VALIDATE, {
    fetchPolicy: 'network-only'
  });

  useEffect(() => {
    if (!data) return;
    const user = data.tokenValidate;
    if (user && user.id) {
      setUserLogged(true);
      socket.emit('join', user.id);

      // client.writeData({ data: { ...user, __typename: 'User' } });
    }
  }, [data, socket]);

  useEffect(() => {
    if (error) {
      setUserLogged(false);
    }
  }, [error]);

  return { userLogged, setUserLogged, loading };
};

function App() {
  // const dispatch = useDispatch();
  const socket = useSocketListener();
  const { userLogged, setUserLogged, loading } = useAuth(socket);

  document.body.style.overflow = 'auto';
  const component = userLogged ? (
    <UserFrontPage setUserLogged={setUserLogged} />
  ) : (
    <FormLogin setUserLogged={setUserLogged} />
  );

  if (loading || typeof userLogged === 'undefined') {
    document.body.style.overflow = 'hidden';
    return <Loader type="pacman" style={{ transform: 'scale(2)' }} />;
  }

  return (
    <SocketContext.Provider value={socket}>{component}</SocketContext.Provider>
  );
}

export { SocketContext };
export default App;
