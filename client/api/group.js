import request from 'superagent';
import { handleSuccess, handleError } from '_utils/api';

export const createGroup = (data) =>
  request
    .post('/api/group/create')
    .send(data)
    .then(handleSuccess)
    .catch(handleError);

    export const getGroups = (data) =>
      requests
        .get('/api/group/all')