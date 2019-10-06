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
    console.log('nope');
    if (isOpen && animationFinished) {
      document.body.style.overflow = 'hidden';
      return;
    }

    if (!isOpen && animationFinished) {
       document.body.style.overflow = 'auto';
    }

    // if (animationFinished) {
    //   setAnimationFinished(undefined);
    //   document.body.style.overflow = 'auto';
    // } else if (animationFinished === false) {
    //   console.log('nope');
    //   document.body.style.overflow = 'hidden';
    // }
  }, [isOpen, animationFinished]);

  return (
    <DialogContainer
      isOpen={isOpen}
      animationFinished={animationFinished}
      animationDuration={animationDuration}>
      {children}
      <FontAwesomeIcon
        className="close"
        size="lg"
        icon={faTimes}
        onClick={controlledClosed}
      />
    </DialogContainer>
  );
};

export default Dialog;
