const users = [
  { email: 'kim@test.com', password: 'shso', name: 'shso' },
  { email: 'shso', password: 'shso', name: 'shso' },
];

export function signIn({ email, password }) {
  const user = users.find(
    (user) => user.email === email && user.password === password
  );
  if (user === undefined) throw new Error();
  return user;
}
