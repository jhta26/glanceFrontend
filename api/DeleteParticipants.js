export default function DeleteParticipants(token, participantId) {
  return fetch(`http://localhost:8000/participants/${participantId}`, {
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
