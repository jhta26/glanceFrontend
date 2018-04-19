import UpdateParticipants from '../../api/UpdateParticipants';

export default function UpdateParticipantsProcess(participantsId, fieldChange) {
  return (dispatch, getState, env) => {
     const { userToken } = getState();
    return UpdateParticipants(participantsId, userToken,fieldChange)
      .then(newParticipant => {
        console.log('UPDATEPARTSCOMPLETED',newParticipant)
        dispatch({ type: 'UPDATE_PARTICIPANTS_COMPLETED', participants: newParticipant });
        return newParticipant;
      })
      .catch(error => {
        dispatch({ type: 'UPDATE_PARTICIPANTS_FAILED' });
      });
  };
}