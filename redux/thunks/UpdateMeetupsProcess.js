import UpdateMeetups from '../../api/UpdateMeetups';

export default function UpdateMeetupsProcess(MeetupId, fieldChange) {
    return (dispatch, getState, env) => {

        const { userToken } = getState();
        console.log('UPDATEMEETPROCESS>>>>',MeetupId,fieldChange,userToken)
        return UpdateMeetups(MeetupId, userToken,fieldChange)
            .then(newMeetup => {
              console.log(newMeetup,'>>>>>>>>>>>>UpdateMeetupsProcess')
                dispatch({ type: 'UPDATE_MEETUPS_COMPLETED', meetups: newMeetup });
                return newMeetup;
            })
            .catch(error => {
                dispatch({ type: 'UPDATE_MEETUPS_FAILED' });
            });
    };
}