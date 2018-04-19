export default function GetUsers(token, userId) {
  return fetch(`http://localhost:8000/users/${userId}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(res => res.json())
    .then(record => {
      return {
        id: record.id,
        name: record.name.trim(),
        username: record.username.trim(),
        bar_info: record.bar_info
      };
    });
}
