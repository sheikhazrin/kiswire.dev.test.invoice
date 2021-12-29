import React from 'react';

function AuthProfile({ user }) {
  const { email, password, name } = user || {};
  return (
    <>
      <h1>Profile</h1>
      <dt>Token:</dt>
      <dd>{email}</dd>
      <dt>Name:</dt>
      <dd>{name}</dd>
    </>
  );
}

export default AuthProfile;
