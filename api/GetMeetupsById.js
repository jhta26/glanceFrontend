export default function GetMeetupsById(meetupId, token) {
  return fetch(`http://localhost:8000/meetups/${meetupId}`, {
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
        name_of_meetup: record.name_of_meetup ? record.name_of_meetup : 'name',
        time_meetup: record.time_meetup,
        location_name: record.location_name,
        location_lat: record.location_lat,
        location_lon: record.location_lon,
        status: record.status
      }))
    );
}
