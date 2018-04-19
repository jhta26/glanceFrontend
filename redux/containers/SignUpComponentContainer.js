import { compose, lifecycle } from 'recompose';
import { connect } from 'react-redux';
import { StyleSheet, DatePickerIOS, View } from 'react-native';
import SignUpComponent from '../../components/SignUpComponent';
import SignUpProcess from '../thunks/SignUpProcess';

function mapStateToProps(state, ownProps) {
  return {
    ...state
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    goBack: () => dispatch({ type: 'GO_BACK' }),
    signUp: info => dispatch(SignUpProcess(info)),
    cancel: () => dispatch({ type: 'CANCEL' })
  };
}

const connectToStore = connect(mapStateToProps, mapDispatchToProps);

export default compose(connectToStore)(SignUpComponent);
