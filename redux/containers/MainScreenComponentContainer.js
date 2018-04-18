import { compose, lifecycle } from 'recompose';
import { connect } from 'react-redux';
import { StyleSheet, View } from 'react-native';
import MainScreenComponent from '../../components/MainScreenComponent';
import GetAllUsersProcess from '../thunks/GetAllUsersProcess';
import CreateMeetupsProcess from '../thunks/CreateMeetupsProcess';
import DeleteMeetupsProcess from '../thunks/DeleteMeetupsProcess'
import UpdateParticipantsProcess2 from '../thunks/UpdateParticipantsProcess2'

function mapStateToProps(state, ownProps) {
    return {
        ...state
    };
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        onMount: () => dispatch(GetAllUsersProcess()),
        onRerender: nextProps => {
            if (nextProps.id) {
                for (i = 0; i < nextProps.length; i++) {
                    dispatch(getMeetupsProcess());
                }
            }
        },

        onUse: info => dispatch(CreateMeetupsProcess(info)),
        onCheck: () => dispatch({ type: 'CHECKSTATE' }),

        onSearch: () => dispatch({ type: 'GO_TO_SEARCH' }),
        storeLocation: location => {
            console.log('container>>>>>>>>>>>>', location)
            dispatch({ type: 'STORE_LOCATION', location: location })
        },
        onStoring: parts => {
            dispatch({ type: "SET_PARTS", participants: parts })
        },
        goBack: () => {
            dispatch({ type: 'GO_BACK_FROM_MEETUP' })
        },
        onDelete: id => dispatch(DeleteMeetupsProcess(id)),
        onUpdateStatus: (id, fieldChange) => dispatch(UpdateParticipantsProcess2(id, fieldChange)),

    };
}

const connectToStore = connect(mapStateToProps, mapDispatchToProps);

const onDidMount = lifecycle({
    componentDidMount() {
        this.props.onMount();
    },
    componentWillReceiveProps(nextProps) {
        if (this.props.meetups !== nextProps.meetups) {
            this.props.onRerender(nextProps);
        }
    }
});

export default compose(connectToStore, onDidMount)(MainScreenComponent);