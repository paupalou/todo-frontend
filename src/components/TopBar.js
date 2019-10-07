import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

import { TopBarContainer, UserName } from './TopBar.styled';

const TopBar = ({ username, logout }) => {
  return (
    <TopBarContainer>
      <section>
        <FontAwesomeIcon icon={faUserCircle} size="lg" />
        <UserName>{username}</UserName>
        <FontAwesomeIcon
          icon={faSignOutAlt}
          size="lg"
          pull="right"
          onClick={logout}
          className="logout"
        />
      </section>
    </TopBarContainer>
  );
};

export default TopBar;
