export default function CreateMeetups(info, userId, token) {
  return fetch(`http://localhost:8000/users/${userId}/meetups`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      creator: info.creator,
      creator_name: info.creator_name,
      destination_address:info.destination_address,
      name_of_meetup: info.name_of_meetup ? info.name_of_meetup : 'name',
      time_meetup: info.date,
      location_name: info.location_name,
      location_lat_lon: info.location_coords,
      active: info.active || 'YES',
      private: info.private || 'NO'
    })
  })
    .then(response => response.json())
    .then(record => {
      return {
        id: record.id
      };
    });
}
