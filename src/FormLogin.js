import React, { useEffect } from 'react';
import io from 'socket.io-client';

function FormLogin() {
  useEffect(() => {
    const socket = io.connect('/socket');
  }, []);

  const login = async (e) => {
    e.preventDefault();
    const token = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({username: 'Pau'}),
      headers: {
        'Content-Type': 'application/json'
      }
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
