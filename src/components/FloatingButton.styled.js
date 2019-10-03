import styled from 'styled-components';

const Button = styled.button`
  appearance: push-button;
  position: fixed;
  width: 40px;
  height: 40px;

  bottom: 40px;
  right: 40px;
  background-color: rgb(69, 173, 168);
  color: rgb(229, 252, 194);
  border: 0;
  border-radius: 50px;
  text-align: center;
  box-shadow: 2px 2px 3px gray;
  outline: none;

  &:hover {
    cursor: pointer;
    transform: scale(1.15);
  }

  & > svg {
    margin-left: 2px;
    margin-top: 2px;
  }
`;

export {Button};
