import { compose, lifecycle } from 'recompose';
import { connect } from 'react-redux';
import { StyleSheet, DatePickerIOS, View } from 'react-native';
import ProfileComponent from '../../components/ProfileComponent';
import GetMeetupsProcess from '../thunks/GetMeetupsProcess';

function mapStateToProps(state, ownProps) {
  return {
    ...state
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    onMount: () => dispatch(GetMeetupsProcess()),
    onShowHistory: () => dispatch({ type: 'GO_TO_HISTORY' }),
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

    onCheck: () => dispatch({ type: 'CHECKSTATE' }),
    onGoBack: () => dispatch({ type: 'GO_BACK' })
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

export default compose(connectToStore, onDidMount)(ProfileComponent);
