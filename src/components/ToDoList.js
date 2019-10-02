import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import {Checkbox} from 'pretty-checkbox-react';

import {ToDoListContainer, ToDoListTitle, ToDo} from './ToDoList.styled';

const ToDoList = ({todos, deleteTodo}) => {
  const checkboxProps = {
    color: 'primary-o',
    shape: 'curve',
    style: 'thick',
    animation: 'smooth',
  };

  return (
    <ToDoListContainer>
      <ToDoListTitle>To Do</ToDoListTitle>
      {todos.map(todo => (
        <ToDo>
          <Checkbox {...checkboxProps}>{todo.title}</Checkbox>
          <FontAwesomeIcon
            className="delete"
            icon={faTrashAlt}
            pull="right"
            onClick={() => deleteTodo(todo._id)}
          />
          <p>{todo.text}</p>
        </ToDo>
      ))}
    </ToDoListContainer>
  );
};

export default ToDoList;
