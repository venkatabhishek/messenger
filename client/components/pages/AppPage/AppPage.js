import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route } from 'react-router';
import { push } from 'connected-react-router';
import R from 'ramda';

import Section from 'react-bulma-companion/lib/Section';
import Container from 'react-bulma-companion/lib/Container';
import Title from 'react-bulma-companion/lib/Title';

import Sidebar from '_organisms/Sidebar';

import ChatPage from '_pages/ChatPage';
import ProfilePage from '_pages/ProfilePage';
import SettingsPage from '_pages/SettingsPage';



export default function HomePage() {
  const dispatch = useDispatch();
  const { user } = useSelector(R.pick(['user']));

  useEffect(() => {
    if (R.isEmpty(user)) {
      dispatch(push('/login'));
    }
  }, []);

  return (
    <div>

        <Sidebar />
        
        <Container className="app">
        
        <Switch>
            <Route path="/app/profile" component={ProfilePage}></Route>
            <Route path="/app/settings" component={SettingsPage}></Route>
            <Route exact path="/app" component={ChatPage}></Route>
          </Switch>

        </Container>
    </div>
  );
}
