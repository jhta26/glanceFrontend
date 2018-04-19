const jwtDecode = require('jwt-decode');
import { AsyncStorage } from 'react-native';
import Authenticate from '../../api/Authenticate';
import GetUsers from '../../api/GetUsers';
import { Actions } from 'react-native-router-flux';

export default function LogInProcess(logIn) {
  let id;
  let tok;
  return (dispatch, getState) => {
    return Authenticate(logIn)
      .then(response => {
        id = jwtDecode(response.token).sub;
        tok = response.token;
        return logIn;
      })
      .then(logIn => {
        return GetUsers(tok, id)
          .then(async info => {
            try {
              await AsyncStorage.setItem('@MeetupsMap:token', tok);
              await AsyncStorage.setItem('MeeptupsMap:userId', id.toString());
            } catch (error) {
              throw error;
            }

            dispatch({
              type: 'SIGN_IN_COMPLETED',
              token: tok,
              user_id: id,
              authenticatedUser: info
            });

            return info;
          })
          .then(lastInfo => {
            return lastInfo;
          })
          .then(() => {
            Actions.CURRENT();
          });
      });
  };
}
