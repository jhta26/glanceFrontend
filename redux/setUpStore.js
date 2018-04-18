import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducers/rootReducer';
import { composeWithDevTools } from 'remote-redux-devtools';

const enhancers = composeWithDevTools(applyMiddleware(thunkMiddleware));

export default function setupStore() {
  return createStore(rootReducer, enhancers);
}
