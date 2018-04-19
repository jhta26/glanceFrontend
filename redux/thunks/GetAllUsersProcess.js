import GetAllUsers from '../../api/GetAllUsers';

export default function GetAllUsersProcess() {
  return (dispatch, getState, env) => {
    const { userToken } = getState();
    return GetAllUsers(userToken)
      .then(users => {
        dispatch({
          type: 'GET_ALLUSERS_COMPLETED',
          users: users
        });
        return participants;
      })
      .catch(error => {
        dispatch({ type: 'GET_ALLUSERS_FAILED' });
      });
  };
}
