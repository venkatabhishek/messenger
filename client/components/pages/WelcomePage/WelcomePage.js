import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';
import R from 'ramda';

import { Button, Title, Container, Section } from 'react-bulma-companion';

export default function WelcomePage() {
  const dispatch = useDispatch();
  const { user } = useSelector(R.pick(['user']));

  // redirect if logged in
  useEffect(() => {
    if (!R.isEmpty(user)) {
      dispatch(push('/app'));
    }
  }, []);

  return (
    <div className="welcome-page page">
      <Section>
        <Container>
          <Button onClick={() => dispatch(push('/login'))}>Login</Button>

          <Button onClick={() => dispatch(push('/register'))}>Register</Button>
        </Container>
      </Section>
    </div>
  );
}
