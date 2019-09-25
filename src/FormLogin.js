import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import io from 'socket.io-client';

function FormLogin() {
  const dispatch = useDispatch();

  useEffect(() => {
    const socket = io.connect('http://localhost:3333');
    socket.on('ACTION/SOCKET-CONNECTED', _ => {
      dispatch({
        type: 'SOCKET-CONNECTED',
      });
    });

    socket.on('ACTION/LOGIN', data => {
      const {user} = data;
      dispatch({type: 'LOGIN', user});
    });
  }, []);

  const login = async e => {
    e.preventDefault();
    const token = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({username: 'Pau'}),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log(token);
  };

  return (
    <form onSubmit={login}>
      <button type="submit">login</button>
    </form>
  );
}

export default FormLogin;
