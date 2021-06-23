import React from 'react';

import { push } from 'connected-react-router';
import { useDispatch } from 'react-redux';
import { attemptLogout } from '_thunks/auth';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons/faUser';
import { faAlignLeft } from '@fortawesome/free-solid-svg-icons/faAlignLeft';
import { faCommentAlt } from '@fortawesome/free-solid-svg-icons/faCommentAlt';
import { faCog } from '@fortawesome/free-solid-svg-icons/faCog';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons/faSignOutAlt';

export default function Navigation() {
    const dispatch = useDispatch();

    
    const logout = () => {
        dispatch(attemptLogout())
        .catch(R.identity);
    };

    return (
        <div className="sidebar">


            <div className="sidebar-inner">

                <div className="sidebar-inner-top">

                    <FontAwesomeIcon icon={faAlignLeft} size="2x"/>
                    <FontAwesomeIcon icon={faCommentAlt} size="2x" onClick={() => dispatch(push('/app/'))}/>
                    <FontAwesomeIcon icon={faUser} size="2x" onClick={() => dispatch(push('/app/profile'))}/>
                    <FontAwesomeIcon icon={faCog} size="2x" onClick={() => dispatch(push('/app/settings'))}/>

                </div>

                <FontAwesomeIcon icon={faSignOutAlt} size="2x" onClick={logout}/>

            </div>


        </div>

    )

}