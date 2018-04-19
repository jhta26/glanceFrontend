import { compose, lifecycle } from 'recompose';
import { connect } from 'react-redux';
import { StyleSheet, DatePickerIOS, View } from 'react-native';
import UpdateMeetupComponent from '../../components/UpdateMeetupComponent';
import GetAllUsersProcess from '../thunks/GetAllUsersProcess';
import CreateMeetupsProcess from '../thunks/CreateMeetupsProcess';
import UpdateMeetupsProcess from '../thunks/UpdateMeetupsProcess'

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
    onSubmit: classes => {
      for (i = 0; i < classes.length; i++) {
        dispatch(
          updateClassesProcess(classes[i].id, { active: true })
        ).then(() => dispatch(getClassesProcess('get')));
      }
    },
    onUse: (MeetupId,fieldChange) => dispatch(UpdateMeetupsProcess(MeetupId,fieldChange)),
    onState: () => dispatch({ type: 'CHECKSTATE' }),
    onGoBack: () => dispatch({ type: 'GO_BACK2' }),
    onSearch: () => dispatch({ type: 'GO_TO_SEARCH' })
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

export default compose(connectToStore, onDidMount)(UpdateMeetupComponent);
