import React, {useState, useEffect, useCallback} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTimes} from '@fortawesome/free-solid-svg-icons';

import {DialogContainer} from './Dialog.styled';

const Dialog = ({isOpen, children, close, done, animationDuration = 0.5}) => {
  const [animationFinished, setAnimationFinished] = useState();

  const controlledClosed = useCallback(() => {
    setAnimationFinished(false);
    setTimeout(() => setAnimationFinished(true), animationDuration * 1000);
    close();
  }, [close, animationDuration]);

  useEffect(() => {
    if (done) {
      controlledClosed();
    }
  }, [done, controlledClosed]);

  useEffect(() => {
    if (isOpen) {
      setAnimationFinished(false);
      setTimeout(() => setAnimationFinished(true), animationDuration * 1000);
    }
  }, [isOpen, animationDuration]);

  useEffect(() => {
    if (isOpen && animationFinished) {
      document.body.style.overflow = 'hidden';
      return;
    }

    if (!isOpen && animationFinished) {
       document.body.style.overflow = 'auto';
    }
  }, [isOpen, animationFinished]);

  return (
    <DialogContainer
      isOpen={isOpen}
      animationFinished={animationFinished}
      animationDuration={animationDuration}>
      <section>{children}</section>
      <FontAwesomeIcon
        className="close"
        size="2x"
        icon={faTimes}
        onClick={controlledClosed}
      />
    </DialogContainer>
  );
};

export default Dialog;
