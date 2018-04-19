import { compose, lifecycle } from 'recompose';
import { connect } from 'react-redux';
import CreateRequestComponent from '../../components/CreateRequestComponent';
import GetAllUsersProcess from '../thunks/GetAllUsersProcess';
import CreateMeetupsProcess from '../thunks/CreateMeetupsProcess';

function mapStateToProps(state, ownProps) {
  return {
    ...state
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    onMount: () => dispatch(GetAllUsersProcess()),
    onUse: info => dispatch(CreateMeetupsProcess(info)),
   
  };
}

const connectToStore = connect(mapStateToProps, mapDispatchToProps);

const onDidMount = lifecycle({
  componentDidMount() {
    this.props.onMount();
  }

});

export default compose(connectToStore, onDidMount)(CreateRequestComponent);
