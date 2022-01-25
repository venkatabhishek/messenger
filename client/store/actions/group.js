export const ADD_GROUP = 'ADD_GROUP';
export const CLEAR_GROUP = 'CLEAR_GROUP';

export function addGroup(data) {
  return {
    type: ADD_GROUP,
    data,
  };
}

export function clearGroups(){
  return {
    type: CLEAR_GROUP
  }
}