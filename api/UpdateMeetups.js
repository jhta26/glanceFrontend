export default function UpdateMeetups(meetupId, token, fieldChange) {
  return fetch(`http://localhost:8000/meetups/${meetupId}`, {
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
      console.log('APIMEETUPS',record)
      return {
        id: record.id,
        name_of_meetup: record.name_of_meetup,
        creator: record.creator,
        creator_name:record.creator_name,
        destination_address:record.destination_address,
        location_name: record.location_name,
        location_lat_lon:record.location_lat_lon,
        time_meetup: record.time_meetup,
        status: record.status
      };
    });
}
