export default function GetAllUsers(token) {
  return fetch(`http://localhost:8000/users`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(res => res.json())
    .then(data =>
      data.map(record => ({
        id: record.id,
        name: record.name.trim(),
        username: record.username.trim(),
        bar_info: record.bar_info
      }))
    );
}
