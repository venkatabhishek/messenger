import { store as RNC } from 'react-notifications-component';

import { getMessages as apiGetMessages } from '_api/message';
import { addMessage } from '_actions/message';

import { dispatchError } from '_utils/api';

export const getMessages = (groupId) => (dispatch) =>
    apiGetMessages(groupId)
        .then((res) => {
            const { body } = res;
            console.log(body)

            for (let message of body) {
                dispatch(addMessage(message));
            }

            return body;
        })
        .catch((err) => {
            console.log(err)
        })