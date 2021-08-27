export const ADD_MESSAGE = 'ADD_MESSAGE';
export const RESET_MESSAGES = 'RESET_MESSAGES';

export function addMessage(msg, user) {
  return {
    type: ADD_MESSAGE,
    msg,
    user,
  };
}

export function resetMessages(){
  return {
    type: RESET_MESSAGES
  }
}
