import styled from 'styled-components';

const calcHeight = ({isOpen, animationFinished}) => {
  if (isOpen) {
    return '100%';
  }

  if (animationFinished || typeof animationFinished === 'undefined') {
    return '0%';
  }

  return '100%';
};

const calcOver = ({isOpen, animationFinished}) => {
  if (isOpen) {
    return 'auto';
  }

  if (animationFinished) {
    return 'hidden';
  }

  return 'auto';
};

const calcTop = ({isOpen}) =>
  isOpen ? `${window.scrollY}px` : `${(window.innerHeight + window.scrollY)}px`;

const DialogContainer = styled.div`
  z-index: 1;
  position: absolute;
  display: flex;
  width: 100%;
  background-color: white;
  top: ${props => calcTop(props)};
  transition: top ${props => props.animationDuration}s
    cubic-bezier(0.97, 0.01, 0, 0.98);

  height: ${props => calcHeight(props)};
  overflow: ${props => calcOver(props)};

  *:first-child {
    flex-grow: 1;
  }

  & > svg {
    &.close {
      flex-basis: 30px;
      color: rgb(89, 79, 79);
      margin-top: 1em;
      margin-right: 1em;
    }

    &:hover {
      cursor: pointer;
      transform: rotate(-5deg) scale(1.25);
    }
  }
`;

export {DialogContainer};
