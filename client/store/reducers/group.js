import update from 'immutability-helper';
import { ADD_GROUP } from '_actions/group';

export default function groups(state = [], action) {
  switch (action.type) {
    case ADD_GROUP:

      return update(state, { $push: [action.data] });

    default:
      return state;
  }
}
