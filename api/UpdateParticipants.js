export default function UpdateParticipants(participantsId, token, fieldChange) {
  console.log('UPDATEPARTS111111',participantsId,token,fieldChange)
  return fetch(`http://localhost:8000/participants/${participantsId}`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      fields: fieldChange
    })
  })
    .then(response => response.json())
    .then(record => {
      console.log('UPDATEPARTS222222',record)
      return {
        id: record.id,
        name: record.name,
        creator: record.creator,
        location_meetup: record.location_meetup,
        time_meetup: record.time_meetup,
        status: record.status
      };
    });
}
