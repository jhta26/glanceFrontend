import DeleteMeetups from '../../api/DeleteMeetups';

export default function DeleteMeetupsProcess(meetupId) {
    return (dispatch, getState) => {
        const { userToken } = getState();
        return DeleteMeetups(userToken,meetupId).then(response => {
            dispatch({ type: 'DELETE_MEETUP', id: meetupId });
            return response;
        });
    };
}