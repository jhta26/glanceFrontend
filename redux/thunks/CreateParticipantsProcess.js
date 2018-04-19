import CreateParticipants from '../../api/CreateParticipants';
import { Actions } from 'react-native-router-flux';
import GetMeetupsProcess from './GetMeetupsProcess'

export default function CreateParticipantsProcess(info) {
 
  let newId;
  return (dispatch, getState) => {
    const { selMeetupId, userId, userToken } = getState();
    var i;
   console.log('CreateParticipantsProcess>>>>>>>>', info,getState())
 
    info.meetup_id = selMeetupId;
    
    return CreateParticipants(info, userId, userToken)
      .then(newId => {
             console.log('CreateParticipantsProcess22222222>>>>>>>>',info)
        info.id = newId.id;
        dispatch({
          type: 'CREATE_PARTICIPANTS_COMPLETED',
          participants: info
          
        });
        return info;
      }).then(dispatch(GetMeetupsProcess()))
      .catch(error => {
        dispatch({ type: 'CREATE_MEETUP_FAILED' });
      });
  };
}