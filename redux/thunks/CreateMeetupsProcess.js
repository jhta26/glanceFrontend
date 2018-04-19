import CreateMeetups from '../../api/CreateMeetups';
import { Actions } from 'react-native-router-flux';

export default function CreateMeetupsProcess(info) {
  let newId;
  return (dispatch, getState) => {
    const { selName, selDate, userId, userToken,authenticatedUser } = getState();
    info.creator = userId;
    info.creator_name = authenticatedUser.name
    return CreateMeetups(info, userId, userToken)
      .then(newId => {
        console.log('APICREATEMEETUPS', newId);
        info.id = newId.id;
        console.log('APICREATEMEETUPS',info)
        dispatch({
          type: 'CREATE_MEETUP_COMPLETED',
          meetups: info,
          selMeetupId: info.id
        });
        return info;
      })
      .catch(error => {
        dispatch({ type: 'CREATE_MEETUP_FAILED' });
      }).then(()=>  Actions.CREATEREQSEARCH());
  };
}
