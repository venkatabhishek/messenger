import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import user from './user';
import messages from './message';
import groups from './group';

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    user,
    messages,
    groups,
  });

export default createRootReducer;
