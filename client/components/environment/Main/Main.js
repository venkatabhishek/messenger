import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router';
import ReactNotification from 'react-notifications-component';
import { useDispatch } from 'react-redux';
import R from 'ramda';

import { attemptGetUser } from '_thunks/user';

import WelcomePage from '_pages/WelcomePage';
import LoginPage from '_pages/LoginPage';
import RegisterPage from '_pages/RegisterPage';
import AppPage from '_pages/AppPage';
import SettingsPage from '_pages/SettingsPage';
import LostPage from '_pages/LostPage';

import Navigation from '_organisms/Navigation';

export default function Main({ location }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(attemptGetUser())
      .catch(R.identity)
      .then(() => setLoading(false));
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return !loading && (
    <div>
      <ReactNotification />
      {/* <Navigation pathname={location.pathname} /> */}
      <div className="main">
        <Switch>
          <Route exact path="/" component={WelcomePage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={RegisterPage} />
          <Route path="/app" component={AppPage} />
          <Route path="*" component={LostPage} />
        </Switch>
      </div>
    </div>
  );
}

Main.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
};
