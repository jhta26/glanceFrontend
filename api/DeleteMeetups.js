export default function DeleteMeetups(token, meetupId) {
  return fetch(`http://localhost:8000/meetups/${meetupId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  })
    .then(response => response.json())
    .then(record => {
      return {
        id: record.id
      };
    });
}
