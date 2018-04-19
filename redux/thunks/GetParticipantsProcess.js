import GetParticipants from '../../api/GetParticipants';

export default function GetParticipantsProcess() {
  return (dispatch, getState, env) => {
    const { userId, userToken } = getState();
    return GetParticipants(userId, userToken)
      .then(participants => {
        dispatch({
          type: 'GET_PARTICIPANTS_COMPLETED',
          participants: participants
        });
        return participants;
      })
      .catch(error => {
        dispatch({ type: 'GET_PARTICIPANTS_FAILED' });
      });
  };
}
