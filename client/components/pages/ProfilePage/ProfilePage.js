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
          <Title>Friends</Title>

          <div className="profile-users">

            {user.friends && user.friends.map((u) => (
                <div className="profile-user profile-block">
                    <div className="profile-user-inner">
                        <div className="circle" style={{marginRight: 20}}>
                            <img src={`https://robohash.org/${encodeURIComponent(u.username)}.png`} alt="" />
                        </div>
                        <h4 className="profile-user-name">{u.username}</h4>
                    </div>
                    <div>
                      
                    </div>
                    
                </div>
                

            ))}

          </div>
        </Container>
      </Section>
    </div>
  );
}
