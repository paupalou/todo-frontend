import styled from 'styled-components';

const FormNewTodo = styled.form`
  font-family: 'Cabin', sans-serif;
  font-size: 1.5em;
  padding: 1em;

  & > label {
    color: rgb(89,79,79);
  }

  & > input {
    height: 40px;
  }

  & > textarea {
    resize: none;
  }

  & > input, textarea {
    padding: 0.25em;
    display: block;
    outline: none;
    border: 2px solid lightgray;
    width: 100%;
  }
`;

export {FormNewTodo};
