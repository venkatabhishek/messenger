import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';


export default function GroupDialog(props) {
    const { open, onClose, group } = props;

    return (
        <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={onClose}
            maxWidth="sm"
            fullWidth={true}
        >
            <div className="container mx-6 my-6 is-flex is-justify-content-center is-align-items-center is-flex-direction-column">
                <h1 className="is-size-2 has-text-weight-bold">{group.name}</h1>

                <div className="info-users">

                    {group.members && group.members.map((user) => (
                        <div className="info-user">
                            <h4>{user.username}</h4>
                        </div>
                        

                    ))}
                    
                </div>

                <h1>Join Code</h1>
                <div className="info-join">
                    <div className="info-user" style={{width: "75%"}}>
                        {group._id}                    
                    </div>    
                    <div className="info-user" style={{width: "20%"}}>
                        Copy
                    </div>
                    
                </div>
                
                
            </div>
        </Dialog>
    );
}

GroupDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    group: PropTypes.object.isRequired
};
