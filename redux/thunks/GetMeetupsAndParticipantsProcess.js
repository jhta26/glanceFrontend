import GetMeetups from '../../api/GetMeetups';
import GetParticipants from '../../api/GetParticipants';
import GetMeetupsById from '../../api/GetMeetupsById';
import { Actions } from 'react-native-router-flux';

export default function GetMeetupsAndParticipantsProcess(logIn) {
  return (dispatch, getState) => {
    var { userId, userToken } = getState();
    return GetMeetups(userId, userToken)
      .then(meetups => {
        dispatch({ type: 'GET_MEETUPS_COMPLETED', meetups: meetups });
        return meetups;
      })
      .then(meetups => {
        return GetParticipants(userId, userToken).then(participants => {
          dispatch({
            type: 'GET_PARTICIPANTS_COMPLETED',
            participants: participants
          });
          return participants;
        });
      })
      .then(participants => {
        return GetMeetupsById(
          participants[0].meetup_id,
          userToken
        ).then(meetups => {
          console.log(meetups);
          dispatch({
            type: 'GET_MEETUPS_COMPLETED',
            meetups: meetups
          });
          console.log(meetups);
          return meetups;
        });
      });
  };
}
