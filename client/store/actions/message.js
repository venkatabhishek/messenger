export const ADD_MESSAGE = 'ADD_MESSAGE';

export function addMessage(msg, user) {
  return {
    type: ADD_MESSAGE,
    msg,
    user,
  };
}
