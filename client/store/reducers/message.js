import update from 'immutability-helper';
import { ADD_MESSAGE, RESET_MESSAGES } from '_actions/message';

export default function messages(state = [], action) {
  switch (action.type) {
    case ADD_MESSAGE:
      // compress messages locally
      if (state.length >= 1) {
        const last = state[state.length - 1];
        if (action.msg.author && last.author._id === action.msg.author._id) {
          last.content += `\n${action.msg.content}`;
          last.date = action.msg.date;

          return update(state, {
            [state.length - 1]: { $set: last },
          });
        }
      }

      return update(state, { $push: [action.msg] });

    case RESET_MESSAGES:
      return []; 
    default:
      return state;
  }
}
