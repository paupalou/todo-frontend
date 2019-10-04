import React, {useState, useEffect} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTimes} from '@fortawesome/free-solid-svg-icons';

import {DialogContainer} from './Dialog.styled';

const Dialog = ({isOpen, children, close, animationDuration = 0.5}) => {
  const [animationFinished, setAnimationFinished] = useState();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setAnimationFinished(false);
      setTimeout(() => setAnimationFinished(true), animationDuration * 1000);
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpen, animationDuration]);

  useEffect(() => {
    if (animationFinished) {
      setAnimationFinished(undefined);
    }
  }, [animationFinished]);

  const controlledClosed = () => {
    setAnimationFinished(false);
    setTimeout(() => setAnimationFinished(true), animationDuration * 1000);
    close();
  };

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
