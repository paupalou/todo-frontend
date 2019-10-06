import styled from 'styled-components';
import {darken} from 'polished';

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

  background-color: rgb(69, 173, 168);
  color: rgb(229, 252, 194);
  box-shadow: 0 6px ${darken(0.1, 'rgb(69, 173, 168)')};

  &:after {
    content: '';
    position: absolute;
    z-index: -1;
  }

  &:hover {
    box-shadow: 0 4px ${darken(0.1, 'rgb(69, 173, 168)')};
    top: 2px;
  }

  &:active {
    box-shadow: 0 0 ${darken(0.1, 'rgb(69, 173, 168)')};
    top: 6px;
  }
`;
export default Button;
