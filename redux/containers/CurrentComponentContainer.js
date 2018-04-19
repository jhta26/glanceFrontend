import { compose, lifecycle } from 'recompose';
import { connect } from 'react-redux';
import { StyleSheet, DatePickerIOS, View } from 'react-native';
import CurrentComponent from '../../components/CurrentComponent';
import GetMeetupsProcess from '../thunks/GetMeetupsProcess';
import GetParticipantsProcess from '../thunks/GetParticipantsProcess';
import GetMeetupsAndParticipantsProcess from '../thunks/GetMeetupsAndParticipantsProcess';
import UpdateMeetupsProcess from '../thunks/UpdateMeetupsProcess'

function mapStateToProps(state, ownProps) {
  return {
    ...state
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    onMount: () => dispatch(GetMeetupsProcess()),
    onRerender: nextProps => {
      if (nextProps.id) {
        for (i = 0; i < nextProps.length; i++) {
          dispatch(GetMeetupsProcess());
        }
      }
    },
    onView:(meetup)=>dispatch({type:'GO_TO_VIEW',selectedMeetup:meetup}),
    onCheck: () => dispatch({ type: 'CHECKSTATE' }),
    onSearch: () => dispatch({ type: 'GO_TO_SEARCH' })
  };
}

const connectToStore = connect(mapStateToProps, mapDispatchToProps);

const onDidMount = lifecycle({
  componentDidMount() {
    this.props.onMount();
  }
  ,
  componentWillReceiveProps(nextProps) {
    if (this.props.meetups !== nextProps.meetups) {
      this.props.onRerender(nextProps);
    }
  }
});

export default compose(connectToStore, onDidMount)(CurrentComponent);
