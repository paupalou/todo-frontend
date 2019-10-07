import styled from 'styled-components';

import widthContainer from './App.styled';

const FormContainer = styled.form`
  ${widthContainer};
  font-family: ${props => props.theme.mainFont};
  font-size: 1.5em;
  padding: 1em;

  & > section.bigLogo {
    & > * {
      display: block;
    }
    & > span {
      text-align: center;
      color: ${props => props.theme.titles};
      margin: 1em 0em;
    }
    & > svg {
      margin: auto;
      color: ${props => props.theme.icons};
    }
  }

  & > label {
    color: ${props => props.theme.icons};
  }

  & > input {
    &[name='title'] {
      margin-bottom: 1.5em;
    }
  }

  & > textarea {
    resize: none;
    &[name='text'] {
      margin-bottom: 1.5em;
    }
  }

  & > input,
  textarea {
    font-size: 1em;
    border-radius: 5px;
    padding: 0.25em;
    display: block;
    outline: none;
    border: ${props => props.theme.boxBorder};
    width: 100%;
  }
`;

export default FormContainer;
