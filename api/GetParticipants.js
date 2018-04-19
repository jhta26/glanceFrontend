export default function GetParticipants(userId, token) {
  return fetch(`http://localhost:8000/users/${userId}/participants`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  })
    .then(response => response.json())
    .then(data =>
      data.map(record => ({
        id: record.id,
        user_id: record.user_id,
        meetup_id: record.meetup_id,
        current_lat: record.current_lat,
        current_lon: record.current_lon,
        time_remaining: record.time_remaining,
        time_arrived: record.time_arrived,
        already_there: record.already_there,
        status: record.status
      }))
    );
}
