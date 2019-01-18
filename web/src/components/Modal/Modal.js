import React from 'react';

const Modal = props => {
  const messages = props.messages.map(message => {
    return (
      <li key={message.message} className={message.type}>
        {message.message}
      </li>
    );
  });

  return (
    <div id="modal-backdrop">
      <div id="modal">
        <ul>{messages}</ul>
        <button onClick={props.onClose}>Okay, got it!</button>
      </div>
    </div>
  );
};

export default Modal;
