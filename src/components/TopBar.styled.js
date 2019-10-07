import styled from 'styled-components';

import widthContainer from './App.styled';

const TopBarContainer = styled.nav`
  font-family: ${props => props.theme.secondaryFont};
  height: 5%;
  padding: 0.5em;
  color: ${props => props.theme.foreground};
  background-color: ${props => props.theme.background};

  & > section {
    ${widthContainer};
    & > svg.logout:hover {
      cursor: pointer;
      color: ${props => props.theme.icons};
      transform: rotate(-5deg) scale(1.25);
    }

    & > .appTitle {
      margin-left: 1em;
    }
  }
`;

const UserName = styled.span`
  font-size: 1.25em;
  margin-left: 0.5em;
`;

export { TopBarContainer, UserName };
