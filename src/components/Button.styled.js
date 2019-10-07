import styled from 'styled-components';

const Button = styled.button`
  border-radius: 5px;
  border: none;
  font-family: inherit;
  font-size: 1.25rem;
  cursor: pointer;
  padding: 15px 40px;
  display: inline-block;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 700;
  outline: none;
  position: relative;
  width: 100%;
  margin-top: 0.75em;

  background-color: ${props => props.theme.background};
  color: ${props => props.theme.foreground};
  box-shadow: 0 6px ${props => props.theme.backgroundShadow};

  &:disabled {
    background-color: lightgray;
  }

  &:after {
    content: '';
    position: absolute;
    z-index: -1;
  }

  &:hover:not([disabled]) {
    box-shadow: 0 4px ${props => props.theme.backgroundShadow};
    top: 2px;
  }

  &:active:not([disabled]) {
    box-shadow: 0 0 ${props => props.theme.backgroundShadow};
    top: 6px;
  }
`;
export default Button;
