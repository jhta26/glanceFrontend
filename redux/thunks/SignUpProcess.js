const jwtDecode = require('jwt-decode');
import Authenticate from '../../api/Authenticate';
import CreateUsers from '../../api/CreateUsers';

export default function SignUpProcess(info) {
  return (dispatch, getState) => {
    return CreateUsers(info).then(info => {
      dispatch({ type: 'SIGN_UP_COMPLETED' });
      return info;
    });
  };
}
