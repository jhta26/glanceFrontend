import { Actions } from 'react-native-router-flux';
export default function rootReducer(
    currentState = {
        allUsers: [],
        participants: [],
        meetups: [],
        selDate: '',
        selName: '',
        selMeetupId: 0,
        location: [],
        selectedMeetup: { name: 'Jason' },
        authenticatedUser: '',
        userId: 0,
        userToken: '',
        users: []
    },
    action
) {
    switch (action.type) {
        case 'GET_ALLUSERS_COMPLETED':
            var theseUsers = currentState;
            theseUsers.users.push(action.users);

            return {
                ...currentState,
                users: action.users
            };
            // case 'CREATE_MEETUP_COMPLETED':
            //     var curState = currentState;

            //     curState.meetups=curState.meetups.push(action.meetups);
            //     console.log('CREATMEETUPCOMPLETED',curState.meetups)
            //     curState.selMeetupId = action.meetups.id;
            //     return {
            //         ...currentState,
            //         meetups: curState.meetups,
            //         selMeetupId: curState.selMeetupId
            //     };
        case 'CREATE_MEETUP_COMPLETED':
            var meet = currentState;
            meet.selMeetupId = action.meetups.id;

            return {
                ...currentState,
                selMeetupId: meet.selMeetupId
            };
        case 'GET_MEETUPS_COMPLETED':
            var theseMeetups = currentState;
            theseMeetups.meetups.push(action.meetups);

            return {
                ...currentState,
                meetups: action.meetups
            };
        case 'UPDATE_PARTICIPANTS_COMPLETED':
            var thesePartsMeets = currentState;
            console.log('ROOTREDUCER>>>>>>>>>>>>>>>>>', thesePartsMeets, action.participants)
            thesePartsMeets = thesePartsMeets.meetups.map(a => a.id == action.participants.id ? a.status = action.participants.status : a)


            Actions.CURRENT()
            return {
                ...currentState,
                meetups: thesePartsMeets
            };
        case 'UPDATE_MEETUPS_COMPLETED':
            var theseMeets = currentState;

            theseMeets1 = theseMeets.meetups.map(a => a.meetup_id == action.meetups.id ? a.location_name = action.meetups.location_name : a).map(a => a.meetup_id == action.meetups.id ? a.time_meetup = action.meetups.time_meetup : a).map(a => a.meetup_id == action.meetups.id ? a.name_meetup = action.meetups.name_meetup : a)


            console.log('ROOTREDUCER>>>>>>>4444', theseMeets1, action.meetups)
            theseMeetss = currentState

            if (theseMeetss.selectedMeetup.id == action.meetups.id) {
                theseMeetss.selectedMeetup.location_name = action.meetups.location_name
                theseMeets.selectedMeetup.time_meetup = action.meetups.time_meetup
                theseMeets.selectedMeetup.name_meetup = action.meetups.name_meetup
            }
            console.log(theseMeetss, 'faweoifjwoejfowiejfoiwjefowejo')

            Actions.CURRENT()
            return {
                ...currentState,
                meetups: theseMeets1.meetups,
                selectedMeetup: theseMeets2.selectedMeetup
            };
        case 'UPDATE_PARTICIPANTS_COMPLETED2':
            var thesePartsMeets = currentState;
            console.log('ROOTREDUCER>>>>>>>>>>>>>>>>>', thesePartsMeets, action.participants)
            thesePartsMeets = thesePartsMeets.meetups.map(a => a.id == action.participants.id ? a.status = action.participants.status : a)



            return {
                ...currentState,
                meetups: thesePartsMeets
            };
        case 'GO_TO_VIEW':
            var theseMeetups = currentState;
            theseMeetups.selectedMeetup = action.selectedMeetup;
            Actions.MEETUP()
            return {
                ...currentState,
                selectedMeetup: action.selectedMeetup
            };
        case 'GO_BACK_FROM_MEETUP':

            Actions.CURRENT()
            return {
                ...currentState

            };
        case 'GET_PARTICIPANTS_COMPLETED':
            var theseParticipants = currentState;
            theseParticipants.participants.push(action.participants);

            return {
                ...currentState,
                participants: action.participants
            };
        case 'GO_TO_HISTORY':
            Actions.HISTORY();
            return {
                ...currentState
            };
        case 'SET_DATE_AND_NAME':
            Actions.CREATEREQ();
            return {
                ...currentState,
                selDate: action.selDate,
                selName: action.selName
            };
        case 'SET_LOC_AND_COORD':
            Actions.CREATEREQSEARCH();
            return {
                ...currentState,
                selLoc: action.selLoc,
                selCoords: action.selCoords
            };
        case 'GO_BACK':
            Actions.PROFILE();
            return {
                ...currentState
            };
        case 'SET_PARTS':
            var currState = currentState;
            currState.participants.push(action.particiapants)
            return {
                ...currentState,
                participants: currentState.participants
            };
        case 'STORE_LOCATION':

            return {
                ...currentState,
                location: action.location
            };
        case 'GO_BACK2':
            Actions.CURRENT();
            return {
                ...currentState
            };
        case 'SIGN_IN_COMPLETED':
            return {
                ...currentState,
                userToken: action.token,
                userId: action.user_id,
                authenticatedUser: action.authenticatedUser
            };
        case 'SIGN_UP_COMPLETED':
            Actions.LOGIN();
            return {
                ...currentState
            };
        case 'SIGN_UP':
            Actions.SIGNUP();
            return {
                ...currentState
            };
        case 'CANCEL':
            Actions.pop();
            return {
                ...currentState
            };
        case 'DELETE_MEETUP':
            var deleteMeet = currentState;
            deleteMeet.meetups = currentState.meetups.filter(a => a.meetup_id !== action.id);
            Actions.CURRENT()
            return {
                ...currentState,
                meetups: deleteMeet.meetups
            };
        case 'CHECKSTATE':
            console.log('CHECKSTATE ROOT', currentState);
            return {
                ...currentState
            };

        default:
            return currentState;
    }
}