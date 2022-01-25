import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import { createGroup as createGroupThunk, joinGroup as joinGroupThunk } from '_thunks/group';


export default function GroupDialog(props) {
  const { onClose, open } = props;
  const [view, setView] = useState('');
  const [name, setName] = useState('');
  const dispatch = useDispatch();

  const closeDialog = () => {
    onClose();
    setView('');
  }

  const createGroup = () => {
    dispatch(createGroupThunk({name, members: []}))
      .then(() => {
        closeDialog();
      }).catch((e) => {
        console.log(e);
      })
  };

  const joinGroup = () => {
    dispatch(joinGroupThunk({ code: name }))
      .then(() => {
        closeDialog();
      }).catch((e) => {
        console.log(e);
      })
  }

  return (
    <Dialog onClose={onClose} aria-labelledby="simple-dialog-title" open={open}>
      {view === ''
        && (
          <div className="container mx-6 my-6 is-flex is-justify-content-center is-align-items-center is-flex-direction-column">
            <h1 className="is-size-2 has-text-weight-bold">Create or Join a Group</h1>
            <p className="subheader">Create a chat group to start talking with your friends!</p>
            <button
              className="button is-size-5 my-4 has-text-weight-bold dialog-btn"
              type="button"
              onClick={() => setView('create')}
            >
              Create my own
            </button>
            <button
              className="button is-size-5 my-4 has-text-weight-bold dialog-btn"
              type="button"
              onClick={() => setView('join')}
            >
              Join an existing  
            </button>
          </div>
        )}

      {view === 'create' && (
        <>
        <div className="container mx-6 my-6 is-flex is-justify-content-center is-align-items-center is-flex-direction-column">
          <h1 className="is-size-3 has-text-weight-bold">Customize your group</h1>
          <p className="subheader">Give your group a name!</p>
          <div className="dialog-input-label">
            <h5 className="is-size-5 has-text-weight-bold mb-3">Group Name</h5>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="dialog-input"
              type="text"
              placeholder="Group Name..."
            />
          </div>

        </div>
          <div className="dialog-footer">
            <p className="dialog-back" onClick={() => setView('')}>Back</p>
            <button className="dialog-submit" onClick={createGroup}>Create</button>
          </div>
          </>
      )}

      {view === 'join' && (
        <>
        <div className="container mx-6 my-6 is-flex is-justify-content-center is-align-items-center is-flex-direction-column">
          <h1 className="is-size-3 has-text-weight-bold">Join a Group</h1>
          <p className="subheader">Enter an invite below to join an existing group</p>
          <div className="dialog-input-label">
            <h5 className="is-size-5 has-text-weight-bold mb-3">Invite Code</h5>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="dialog-input"
              type="text"
              placeholder="hTKzmak..."
            />
          </div>

        </div>
          <div className="dialog-footer">
            <p className="dialog-back" onClick={() => setView('')}>Back</p>
            <button className="dialog-submit" onClick={joinGroup}>Join</button>
          </div>
          </>
      )}
    </Dialog>
  );
}

GroupDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};
