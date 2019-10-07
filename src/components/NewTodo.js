import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import Dialog from './Dialog';
import FloatingButton from './FloatingButton.styled';
import FormContainer from './Form.styled';
import Button from './Button.styled';

const NewTodo = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [done, setDone] = useState(false);
  const [todoTitle, setTodoTitle] = useState('');
  const [todoText, setTodoText] = useState('');

  useEffect(() => {
    if (done) {
      setTimeout(setDone(false), 2000);
    }
  }, [done]);

  useEffect(() => {
    if (!dialogOpen) {
      setTodoTitle('');
      setTodoText('');
    }
  }, [dialogOpen]);

  const createTodo = async event => {
    event.preventDefault();
    await fetch('/api/todos', {
      method: 'POST',
      body: JSON.stringify({ title: todoTitle, text: todoText }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    setDone(true);
  };

  return (
    <>
      <Dialog
        isOpen={dialogOpen}
        done={done}
        close={() => setDialogOpen(false)}
      >
        <FormContainer onSubmit={createTodo}>
          <label htmlFor="title">title</label>
          <input
            type="text"
            name="title"
            value={todoTitle}
            onChange={e => setTodoTitle(e.target.value)}
          />

          <label htmlFor="text">text</label>
          <textarea
            name="text"
            rows={10}
            value={todoText}
            onChange={e => setTodoText(e.target.value)}
          />

          <Button type="submit">create</Button>
        </FormContainer>
      </Dialog>

      <FloatingButton onClick={() => setDialogOpen(true)}>
        <FontAwesomeIcon icon={faPlus} />
      </FloatingButton>
    </>
  );
};

export default NewTodo;
