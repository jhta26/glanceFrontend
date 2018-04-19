import UpdateUsers from '../../api/UpdateUsers';

export default function UpdateParticipantsProcess(userId, fieldChange) {
  return (dispatch, getState, env) => {
     const { userToken } = getState();
    return UpdateUsers(userId, userToken,fieldChange)
      .then(newUser => {
        console.log('UPDATEUSERCOMPLETED',newParticipant)
        dispatch({ type: 'UPDATE_USER_COMPLETED', users: newUser });
        return newUser;
      })
      .catch(error => {
        dispatch({ type: 'UPDATE_PARTICIPANTS_FAILED' });
      });
  };
}