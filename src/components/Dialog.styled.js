import styled, { keyframes } from 'styled-components';

const slide = keyframes`
  0% {
    transform: translateY(0);
  }

  100% {
    transform: translateY(-1000px);
    top: 0%;
  }
`;

  // animation: ${slide} 0.5s cubic-bezier(1, -0.5, 0.5, 1);
const DialogContainer = styled.div`
  position: absolute;
  width: 100%;
  background-color: white;
  top: ${props => props.isOpen ? '0%': '100%'};
  height: ${props => props.isOpen ? '100%': '0px'};
  overflow:hidden;
  transition: top 1s ease;

  & > svg {
    &.close {
      position: fixed;
      top: 1em;
      right: 1em;
      color: rgb(89,79,79);
    }

    &:hover {
      cursor: pointer;
      color: rgb(89,79,79);
      transform: rotate(-5deg) scale(1.25);
    }
  }
`;

export { DialogContainer };
