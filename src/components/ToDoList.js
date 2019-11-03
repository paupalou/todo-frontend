import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Checkbox } from 'pretty-checkbox-react';

import {
  ToDoListContainer,
  ToDoListTitle,
  ToDoContainer
} from './ToDoList.styled';

const Checked = (
  <svg
    aria-hidden="true"
    focusable="false"
    data-prefix="fas"
    data-icon="check-square"
    className="svg-inline--fa fa-check-square fa-w-14"
    role="img"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 386 441"
  >
    <path
      fill="currentColor"
      d="M400 32H48C21.49 32 0 53.49 0 80v352c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49 48-48V80c0-26.51-21.49-48-48-48zm0 400H48V80h352v352zm-35.864-241.724L191.547 361.48c-4.705 4.667-12.303 4.637-16.97-.068l-90.781-91.516c-4.667-4.705-4.637-12.303.069-16.971l22.719-22.536c4.705-4.667 12.303-4.637 16.97.069l59.792 60.277 141.352-140.216c4.705-4.667 12.303-4.637 16.97.068l22.536 22.718c4.667 4.706 4.637 12.304-.068 16.971z"
    />
  </svg>
);

const ToDo = ({ todo, toggleTodo, deleteTodo }) => {
  const checkboxProps = {
    className: 'custom-checkbox',
    color: 'primary-o',
    shape: 'curve',
    animation: 'smooth',
    svg: Checked,
    style: 'thick'
  };

  const deleteAction = () => {
    deleteTodo({ variables: { id: todo.id } });
  };

  return (
    <ToDoContainer key={todo.id}>
      <Checkbox
        {...checkboxProps}
        plain
        onChange={() => toggleTodo(todo.id)}
        checked={todo.done}
      >
        {todo.title}
      </Checkbox>
      <FontAwesomeIcon
        className="delete"
        icon={faTrashAlt}
        pull="right"
        onClick={deleteAction}
      />
      <p>{todo.text}</p>
    </ToDoContainer>
  );
};

const ToDoList = ({ todos, deleteTodo, toggleTodo }) => {
  return (
    <ToDoListContainer>
      <ToDoListTitle>To Do</ToDoListTitle>
      {todos.map(todo => (
        <ToDo
          key={todo.id}
          todo={todo}
          deleteTodo={deleteTodo}
          toggleTodo={toggleTodo}
        />
      ))}
    </ToDoListContainer>
  );
};

export default ToDoList;
