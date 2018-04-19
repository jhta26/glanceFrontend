export default function CreateUsers(newUser) {
  console.log('CREATEUSERS')
  return fetch(`http://localhost:8000/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: newUser.name,
      username: newUser.username,
      password: newUser.password
    })
  }).then(response => response.json());
}
