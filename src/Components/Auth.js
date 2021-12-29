const users = [
  { email: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIyIiwiZmlyc3RuYW1lIjoiVXNlciIsImxhc3RuYW1lIjoiMiIsImVtYWlsIjoidXNlcjJAdGVzdC5jb20iLCJ3b3JrZ3JvdXBpZCI6MCwicm9sZWlkIjowLCJyb2xlbGV2ZWwiOjAsInBob3RvdXJsIjoibm9uZSIsInNpZ25hdHVyZXVybCI6Im5vbmUiLCJleHAiOjE2NDA4MjUwOTZ9.IkFYA5ygpXkOQLtNrwW2yoUDAx8ydKIiDeYHG71E-Jg', password: 'shso', name: 'sheikhazrin' },
  { email: 'shso', password: 'shso', name: 'sheikhazrin' },
];

export function signIn({ email, password }) {
  const user = users.find(
    (user) => user.email === email && user.password === password
  );
  if (user === undefined) throw new Error();
  return user;
}
