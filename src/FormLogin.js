import React from 'react';

function FormLogin() {
  const login = async e => {
    e.preventDefault();
    await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({username: 'Pau'}),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };

  return (
    <form onSubmit={login}>
      <button type="submit">login</button>
    </form>
  );
}

export default FormLogin;
