import styled from 'styled-components';

const TopBarContainer = styled.div`
  height: 5%;
  padding: .5em;
  color: rgb(229,252,194);
  background-color: rgb(69,173,168);

  & > svg.logout:hover {
    cursor: pointer;
    color: rgb(89,79,79);
    transform: rotate(-5deg) scale(1.25);
  }
`
const UserName = styled.span`
  font-family: 'Righteous', cursive;
  font-size: 1.25em;
  margin-left: .5em;
`

export { TopBarContainer, UserName };
