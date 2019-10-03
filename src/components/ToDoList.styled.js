import styled from 'styled-components';

const ToDoListContainer = styled.section`
  & svg.delete:hover {
    cursor: pointer;
    color: rgb(89,79,79);
    transform: rotate(-5deg) scale(1.25);
  }
`;

const ToDoListTitle = styled.h2`
  padding: 0em 1em;
  color: rgb(84,121,128);
  font-family: 'Righteous', cursive;
`

const ToDo = styled.article`
  color: rgb(89,79,79);
  padding: 0.25em 1em;
  font-family: 'Cabin', sans-serif;
  font-size: 1.25em;
  font-weight: 600;

  & > p {
    font-size: 0.6em;
    color: rgb(69,173,168);
  }
`

export { ToDoListContainer, ToDoListTitle, ToDo };
