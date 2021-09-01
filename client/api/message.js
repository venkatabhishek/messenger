import request from 'superagent';

export const getMessages = (groupId) => 
    request
        .get(`/api/message/group/${groupId}`)
