import { compose, lifecycle } from 'recompose';
import { connect } from 'react-redux';
import { StyleSheet, DatePickerIOS, View } from 'react-native';
import HistoryComponent from '../../components/HistoryComponent';
import GetMeetupsProcess from '../thunks/GetMeetupsProcess';

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
          dispatch(getMeetupsProcess());
        }
      }
    }
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

export default compose(connectToStore, onDidMount)(HistoryComponent);
