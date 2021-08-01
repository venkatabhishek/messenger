import update from 'immutability-helper';
import { ADD_MESSAGE } from '_actions/message';

export default function messages(state = [], action) {
  switch (action.type) {
    case ADD_MESSAGE:
      if (state.length >= 1) {
        const last = state[state.length - 1];

        if (action.user && last.author === action.user) {
          last.text += `\n${action.msg.text}`;
          last.date = action.msg.date;

          return update(state, {
            [state.length - 1]: { $set: last },
          });
        }
      }

      return update(state, { $push: [action.msg] });

    default:
      return state;
  }
}
