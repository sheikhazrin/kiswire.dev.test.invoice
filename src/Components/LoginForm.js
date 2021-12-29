import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

function LoginForm({ authenticated, login, location }) {
  const [email, setEmail] = useState('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIyIiwiZmlyc3RuYW1lIjoiVXNlciIsImxhc3RuYW1lIjoiMiIsImVtYWlsIjoidXNlcjJAdGVzdC5jb20iLCJ3b3JrZ3JvdXBpZCI6MCwicm9sZWlkIjowLCJyb2xlbGV2ZWwiOjAsInBob3RvdXJsIjoibm9uZSIsInNpZ25hdHVyZXVybCI6Im5vbmUiLCJleHAiOjE2NDA4MjUwOTZ9.IkFYA5ygpXkOQLtNrwW2yoUDAx8ydKIiDeYHG71E-Jg');
  const [password, setPassword] = useState('shso');

  const handleClick = () => {
    try {
      login({ email, password });
    } catch (e) {
      alert('Failed to sign in');
      setEmail('');
      setPassword('shso');
    }
  };

  const { from } = location.state || { from: { pathname: '/' } };
  if (authenticated) return <Redirect to={from} />;

  return (
    <div className="py-5 text-center container">
      <div className="form-signin">
        <h1 className="mb-3 fw-light">Please sign in</h1>
        <p className="lead fw-normal">
          Just fill in the token and click submit.
        </p>
        <div class="form-floating">
          <input
            className="form-control"
            value={email}
            onChange={({ target: { value } }) => setEmail(value)}
            type="text"
            placeholder="Token"
          />{' '}
          <label for="floatingInput">Token</label>
        </div>
        <input
          className="form-control"
          value={password}
          onChange={({ target: { value } }) => setPassword(value)}
          type="hidden"
          placeholder="password"
        />
        <button className="btn btn-primary" onClick={handleClick} type="submit">
          Login
        </button>
      </div>
    </div>
  );
}

export default LoginForm;
