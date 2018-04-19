export default function CreateParticipants(info, userId, token) {
  return fetch(`http://localhost:8000/users/${userId}/participants`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      user_id: info.id,
      meetup_id: info.meetup_id,
      current_lat_lon: info.current_lat_lon,
      time_remaining: info.time_remaining,
      time_arrived: info.time_arrived,
      status: info.status
    })
  })
    .then(response => response.json())
    .then(record => {
      return {
        id: record.id
      };
    });
}


     // {
     //    user_id: 1,
     //    meetup_id: 4,
     //    status: '',
     //    current_lat_lon: '37.7881439, -122.4017237',
     //    time_remaining: '',
     //    time_arrived: '',
     //    already_there: ''
     //  }