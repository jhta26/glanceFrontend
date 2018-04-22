import { compose, lifecycle } from 'recompose';
import { connect } from 'react-redux';
import CreateRequestSearchComponent from '../../components/CreateRequestSearchComponent';
import GetAllUsersProcess from '../thunks/GetAllUsersProcess';
import CreateParticipantsProcess from '../thunks/CreateParticipantsProcess';
import GetMeetupsProcess from '../thunks/GetMeetupsProcess'
import { Actions } from 'react-native-router-flux';

function mapStateToProps(state, ownProps) {
    return {
        ...state
    };
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        onMount: () => dispatch(GetAllUsersProcess()),
        onCreateParts: info => {
            
            for (i = 0; i < info.users.length; i++) {
                dispatch(CreateParticipantsProcess(info.users[i]));
            }
           
            Actions.CURRENT()
        },

        onGoBack: () => dispatch({ type: 'GO_BACK2' }),

    };
}

const connectToStore = connect(mapStateToProps, mapDispatchToProps);

const onDidMount = lifecycle({
    componentDidMount() {
        this.props.onMount();
    }

});

export default compose(connectToStore, onDidMount)(
    CreateRequestSearchComponent
);