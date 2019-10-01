import React, {useState, useContext} from 'react';
import {useDispatch} from 'react-redux';

import {SocketContext} from './App';

function FormLogin() {
  const dispatch = useDispatch();
  const [username, setUsername] = useState();
  const socket = useContext(SocketContext);

  const login = async e => {
    e.preventDefault();
    const loginResponse = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({username}),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (loginResponse.ok) {
      const user = await loginResponse.json();
      socket.emit('join', user.userId);
      dispatch({type: 'LOGIN#USERNAME', user});
    }
  };

  return (
    <form onSubmit={login}>
      <input type="text" onChange={e => setUsername(e.target.value)} />
      <button type="submit">login</button>
    </form>
  );
}

export default FormLogin;
