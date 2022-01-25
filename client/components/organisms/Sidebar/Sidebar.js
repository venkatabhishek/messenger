import React from 'react';

import PropTypes from 'prop-types';

import { push } from 'connected-react-router';
import { useDispatch } from 'react-redux';
import { attemptLogout } from '_thunks/auth';
import { clearGroups } from '_actions/group';
import R from 'ramda';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons/faUser';
import { faAlignLeft } from '@fortawesome/free-solid-svg-icons/faAlignLeft';
import { faCommentAlt } from '@fortawesome/free-solid-svg-icons/faCommentAlt';
import { faCog } from '@fortawesome/free-solid-svg-icons/faCog';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons/faPlusSquare';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons/faSignOutAlt';

export default function Navigation(props) {
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(attemptLogout()).catch(R.identity);
    dispatch(clearGroups());
  };

  return (
    <div className="sidebar">
      <div className="sidebar-inner">
        <div className="sidebar-inner-group">
          <FontAwesomeIcon icon={faAlignLeft} size="2x" />
          <FontAwesomeIcon
            icon={faCommentAlt}
            size="2x"
            onClick={() => dispatch(push('/app/'))}
          />
          <FontAwesomeIcon
            icon={faUser}
            size="2x"
            onClick={() => dispatch(push('/app/profile'))}
          />
          <FontAwesomeIcon
            icon={faPlusSquare}
            size="2x"
            onClick={props.openDialog}
          />
        </div>
        <div className="sidebar-inner-group">
          <FontAwesomeIcon
            icon={faCog}
            size="2x"
            onClick={() => dispatch(push('/app/settings'))}
          />
          <FontAwesomeIcon icon={faSignOutAlt} size="2x" onClick={logout} />
        </div>
      </div>
    </div>
  );
}

Navigation.propTypes = {
  openDialog: PropTypes.func.isRequired,
};