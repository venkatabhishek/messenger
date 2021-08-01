const ADD_GROUP = 'ADD_GROUP';

export function addGroup(data) {
  return {
    type: ADD_GROUP,
    data,
  };
}
