import GetMeetups from '../../api/GetMeetups';

export default function GetMeetupsProcess() {
  return (dispatch, getState, env) => {
    const { userId, userToken } = getState();
    return GetMeetups(userId, userToken)
      .then(meetups => {
        dispatch({ type: 'GET_MEETUPS_COMPLETED', meetups: meetups });
        return meetups;
      })
      .catch(error => {
        dispatch({ type: 'GET_MEETUPS_FAILED' });
      });
  };
}
