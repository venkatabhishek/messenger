import update from 'immutability-helper';
import { ADD_GROUP, CLEAR_GROUP } from '_actions/group';

export default function groups(state = [], action) {
  switch (action.type) {
    case ADD_GROUP:
      return [...state, action.data]
    case CLEAR_GROUP:
      return []
    default:
      return state;
  }
}
