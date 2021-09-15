import { store as RNC } from 'react-notifications-component';

import { joinGroup as apiJoinGroup, createGroup as apiCreateGroup, getGroups as apiGetGroups } from '_api/group';
import { addGroup } from '_actions/group';

import { dispatchError } from '_utils/api';

export const getGroups = () => (dispatch) =>
  apiGetGroups()
    .then((res) => {
      const { body } = res;

      console.log(body)

      for (let group of body) {
        dispatch(addGroup(group));
      }

      return body;
    })  
    .catch((err) => {
      console.log(err)
    })

export const createGroup = (data) => (dispatch) =>
  apiCreateGroup(data)
    .then((res) => {
      const { body } = res;
      dispatch(addGroup(body));

      RNC.addNotification({
        title: 'Success!',
        message: 'Created a new group!',
        type: 'success',
        container: 'top-right',
        animationIn: ['animated', 'fadeInRight'],
        animationOut: ['animated', 'fadeOutRight'],
        dismiss: {
          duration: 5000,
        },
      });

      return body;
    })
    .catch(dispatchError(dispatch));

export const joinGroup = (data) => (dispatch) =>
    apiJoinGroup(data)
      .then((res) => {
        const { body } = res;
        dispatch(addGroup(body));

        RNC.addNotification({
          title: 'Success!',
          message: 'Joined a new group!',
          type: 'success',
          container: 'top-right',
          animationIn: ['animated', 'fadeInRight'],
          animationOut: ['animated', 'fadeOutRight'],
          dismiss: {
            duration: 5000,
          },
        });

        return body;
      })
      .catch(dispatchError(dispatch));