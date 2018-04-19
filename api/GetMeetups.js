export default function GetMeetups(userId, token) {
  return fetch(`http://localhost:8000/users/${userId}/meetups`, {
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
        creator: record.creator,
        creator_name: record.creator_name,
        name_of_meetup: record.name_of_meetup ? record.name_of_meetup : 'name',
        time_meetup: record.time_meetup,
        location_name: record.location_name,
        location_lat_lon: record.location_lat_lon,
        active: record.active,
        status: record.status,
        private: record.private,
        user_id: record.user_id,
        meetup_id: record.meetup_id,
        current_lat_lon: record.current_lat_lon,
        time_remaining: record.time_remaining,
        time_arrived: record.time_arrived,
        already_there: record.already_there,
        status: record.status
      }))
    );
}
