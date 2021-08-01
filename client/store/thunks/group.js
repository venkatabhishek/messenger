import { snakeToCamelCase } from 'json-style-converter/es5';
import { store as RNC } from 'react-notifications-component';

import { createGroup as reqGroup } from '_api/group';
import { createGroup as actionGroup } from '_actions/group';

import { dispatchError } from '_utils/api';

export const makeGroup = (data) => (dispatch) =>
  reqGroup(data)
    .then((res) => {
      console.log(res);
      const { body } = res;
      dispatch(actionGroup(body));

      RNC.addNotification({
        title: 'Successfully created a group!',
        message: data.message,
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

    