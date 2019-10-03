import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTimes} from '@fortawesome/free-solid-svg-icons';

import {DialogContainer} from './Dialog.styled';

const Dialog = ({isOpen, children, close}) => {
  return (
    <DialogContainer isOpen={isOpen}>
      <FontAwesomeIcon
        className="close"
        size="lg"
        icon={faTimes}
        onClick={close}
      />
      {children}
    </DialogContainer>
  );
};

export default Dialog;
