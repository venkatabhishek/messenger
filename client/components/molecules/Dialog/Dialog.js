import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import { createGroup } from '_thunks/group';

export default function GroupDialog(props) {
  const { onClose, open } = props;
  const [view, setView] = useState('');
  const [name, setName] = useState('');
  const dispatch = useDispatch();

  const createGroup = () => {
    dispatch(createGroup({name, members: []}))
      .then(() => {
        onClose();
      }
      ).catch((e) => {
        console.log(e);
      })
  };

  return (
    <Dialog onClose={onClose} aria-labelledby="simple-dialog-title" open={open}>
      {view === ''
        && (
          <div className="container mx-6 my-6 is-flex is-justify-content-center is-flex-direction-column">
            <h1 className="is-size-2">Create or Join a Group</h1>
            <button
              className="button is-light my-4"
              type="button"
              onClick={() => setView('create')}
            >
              Create my own
            </button>
            <button
              className="button is-light my-4"
              type="button"
              onClick={() => setView('join')}
            >
              Join an existing
            </button>
          </div>
        )}

      {view === 'create' && (
        <div className="container mx-6 my-6 is-flex is-justify-content-center is-flex-direction-column">
          <h1 className="is-size-2">Create a Group</h1>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input"
            type="text"
            placeholder="Group Name..."
          />
          <button className="button is-light my-4" type="button" onClick={createGroup}>Create</button>
          <button className="button is-light my-4" type="button" onClick={() => setView('')}>Back</button>
        </div>
      )}

      {view === 'join' && (
        <div className="container mx-6 my-6 is-flex is-justify-content-center is-flex-direction-column">
          <h1 className="is-size-2">Join a Group</h1>
          <button className="button is-light my-4" type="button" onClick={() => setView('')}>Back</button>
        </div>
      )}
    </Dialog>
  );
}

GroupDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};
