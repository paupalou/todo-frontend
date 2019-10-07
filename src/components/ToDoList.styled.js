import styled from 'styled-components';

import widthContainer from './App.styled';

const ToDoListContainer = styled.section`
  ${widthContainer};
  font-family: ${props => props.theme.mainFont};
  & svg.delete:hover {
    cursor: pointer;
    color: ${props => props.theme.icons};
    transform: rotate(-5deg) scale(1.25);
  }
`;

const ToDoListTitle = styled.h2`
  padding: 0em 1em;
  color: ${props => props.theme.titles};
  font-family: ${props => props.theme.secondaryFont};
`;

const ToDoContainer = styled.article`
  color: ${props => props.theme.icons};
  padding: 0.25em 1em;
  font-size: 1.25em;
  font-weight: 600;

  & > p {
    font-size: 0.7em;
    margin-top: 0.25em;
    padding: 0 2.2em;
    color: ${props => props.theme.descriptions};
  }
`;

export { ToDoListContainer, ToDoListTitle, ToDoContainer };
