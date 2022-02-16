import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';


export default function GroupDialog(props) {
    const { open, onClose, group, user } = props;
    const [copied, setcopied] = useState(false);
    

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

                    {group.members && group.members.map((u) => (
                        <div className="info-user info-block">
                            <div className="info-user-inner">
                                <div className="circle" style={{marginRight: 20}}>
                                    <img src={`https://robohash.org/${encodeURIComponent(u.username)}.png`} alt="" />
                                </div>
                                <h4 className="info-user-name">{u.username}</h4>
                            </div>
                            <div className="info-user-inner">
                                {user.id == group.owner && <button>Remove</button>}
                            </div>
                            
                        </div>
                        

                    ))}
                    
                </div>

                <h1>Join Code</h1>
                <div className="info-join">
                    <div className="info-block info-user-name info-code" style={{width: "75%"}}>
                        {group._id}                    
                    </div>    
                    <div className="info-block info-user-name info-code" 
                    style={{width: "20%", cursor: "pointer"}}
                    onClick={() => {setcopied(true); navigator.clipboard.writeText(group._id)}}>
                        {copied ? "Copied" : "Copy"}
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
