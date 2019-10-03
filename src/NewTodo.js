import React, {useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlus} from '@fortawesome/free-solid-svg-icons';

import Dialog from './components/Dialog';
import {Button} from './components/FloatingButton.styled';
import {FormNewTodo} from './components/NewTodo.styled';

const FloatingButton = props => {
  return (
    <Button {...props}>
      <FontAwesomeIcon icon={faPlus} />
    </Button>
  );
};

const NewTodo = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [todoTitle, setTodoTitle] = useState();
  const [todoText, setTodoText] = useState();

  const createTodo = async event => {
    event.preventDefault();
    await fetch('/api/todos', {
      method: 'POST',
      body: JSON.stringify({title: todoTitle, text: todoText}),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };

  return (
    <>
      <Dialog isOpen={dialogOpen} close={() => setDialogOpen(false)}>
        <FormNewTodo onSubmit={createTodo}>
          title{' '}
          <input type="text" onChange={e => setTodoTitle(e.target.value)} />
          text <input type="text" onChange={e => setTodoText(e.target.value)} />
          <button type="submit">create</button>
        </FormNewTodo>
      </Dialog>

      <FloatingButton onClick={() => setDialogOpen(true)} />
    </>
  );
};

export default NewTodo;
