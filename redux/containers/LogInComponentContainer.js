import { compose, lifecycle } from 'recompose';
import { connect } from 'react-redux';
import { StyleSheet, DatePickerIOS, View } from 'react-native';
import LogInComponent from '../../components/LogInComponent';
import LogInProcess from '../thunks/LogInProcess';

function mapStateToProps(state, ownProps) {
  return {
    ...state
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    goBack: () => dispatch({ type: 'GO_BACKKK' }),
    signIn: logIn => {
      dispatch(LogInProcess(logIn));
    },
    signUp: () => dispatch({ type: 'SIGN_UP' })
  };
}

const connectToStore = connect(mapStateToProps, mapDispatchToProps);

export default compose(connectToStore)(LogInComponent);
