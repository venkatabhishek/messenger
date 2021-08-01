import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';
import R from 'ramda';

import { Button, Title, Container, Section } from 'react-bulma-companion';

export default function Profile() {
  const dispatch = useDispatch();
  const { user } = useSelector(R.pick(['user']));

  return (
    <div className="welcome-page page">
      <Section>
        <Container>
          <Title>Profile</Title>
        </Container>
      </Section>
    </div>
  );
}
