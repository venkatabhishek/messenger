import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route } from 'react-router';
import { push } from 'connected-react-router';
import R from 'ramda';

import Container from 'react-bulma-companion/lib/Container';
import Sidebar from '_organisms/Sidebar';
import Dialog from '_molecules/Dialog';

import ChatPage from '_pages/ChatPage';
import ProfilePage from '_pages/ProfilePage';
import SettingsPage from '_pages/SettingsPage';

export default function HomePage() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(true); // group dialog
  const { user } = useSelector(R.pick(['user']));

  useEffect(() => {
    if (R.isEmpty(user)) {
      dispatch(push('/login'));
    }

    // get all groups for current user

  }, []);

  return (
    <div>
      <Sidebar openDialog={() => setOpen(true)} />

      <Container className="app">
        <Switch>
          <Route path="/app/profile" component={ProfilePage} />
          <Route path="/app/settings" component={SettingsPage} />
          <Route exact path="/app" component={ChatPage} />
        </Switch>
      </Container>

      <Dialog open={open} onClose={() => setOpen(false)} />
    </div>
  );
}
