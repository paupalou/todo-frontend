import React, { useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTasks,
  faEdit,
  faThumbsUp,
  faSadTear
} from '@fortawesome/free-solid-svg-icons';
import { useLazyQuery, useApolloClient } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

import { SocketContext } from './../App';
import { TopBarContainer } from './TopBar.styled';
import FormContainer from './Form.styled';
import Button from './Button.styled';

const LOGIN_QUERY = gql`
  query login($username: String!) {
    login(username: $username) {
      username
      userId
    }
  }
`;

function FormLogin({ setUserLogged }) {
  const [username, setUsername] = useState();
  const [userCreated, setUserCreated] = useState(false);
  const [errorOccurred, setErrorOccurred] = useState(false);
  const client = useApolloClient();
  const [call, { loading, data }] = useLazyQuery(LOGIN_QUERY, {
    fetchPolicy: 'network-only'
  });
  const socket = useContext(SocketContext);

  const changeUsername = event => {
    setUsername(event.target.value);
    setUserCreated(false);
  };

  const login = async event => {
    event.preventDefault();
    call({ variables: { username } });
    // const loginResponse = await fetch('/api/login', {
    //   method: 'POST',
    //   body: JSON.stringify({ username }),
    //   headers: {
    //     'Content-Type': 'application/json'
    //   }
    // });

    // if (loginResponse.ok) {
    //   const user = await loginResponse.json();
    //   socket.emit('join', user.userId);
    //   dispatch({ type: 'LOGIN#USERNAME', user });
    // }
  };

  if (data && data.login) {
    // client.writeData({
    //   data: {
    //     user: { ...data.login }
    //   }
    // });
    socket.emit('join', data.login.userId);
    setUserLogged(true);
  }

  const createUser = async event => {
    event.preventDefault();

    const createResponse = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ username }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (createResponse.ok) {
      // dispatch({ type: 'CREATE#USER', username });
      setErrorOccurred(false);
      setUserCreated(true);
    } else {
      setErrorOccurred(true);
    }
  };

  const appBigLogo = (userCreated, errorOccurred) => (
    <section className="bigLogo">
      <FontAwesomeIcon
        icon={errorOccurred ? faSadTear : userCreated ? faThumbsUp : faEdit}
        size="3x"
        className="bigLogo"
      />
      <span>
        {errorOccurred
          ? 'An error occurred creating user'
          : userCreated
          ? 'User Created successfully! You can login now'
          : 'Welcome!'}
      </span>
    </section>
  );

  return (
    <>
      <TopBarContainer>
        <section style={{ textAlign: 'center' }}>
          <FontAwesomeIcon icon={faTasks} size="lg" />
          <span className="appTitle">TODO APP</span>
        </section>
      </TopBarContainer>
      <FormContainer onSubmit={login}>
        {appBigLogo(userCreated, errorOccurred)}
        <label htmlFor="username">username</label>
        <input type="text" name="username" onChange={changeUsername} />
        <Button type="submit" name="login">
          login
        </Button>
        <Button disabled={userCreated} name="create" onClick={createUser}>
          create
        </Button>
      </FormContainer>
    </>
  );
}

export default FormLogin;
