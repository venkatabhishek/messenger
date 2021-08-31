import request from 'superagent';

export const createGroup = (data) =>
  request
    .post('/api/group/create')
    .send(data)

export const joinGroup = (data) =>
  request
    .post('/api/group/join')
    .send(data)

export const getGroups = () =>
  request
    .get('/api/group/all')