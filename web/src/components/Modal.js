import React from 'react';

const Modal = props => {
  const messages = props.messages.map(message => {
    return (
      <div key={message.message} className={'alert alert-' + message.type}>
        {message.message}
      </div>
    );
  });

  return (
    <div className="my-3" id="modal">
      {messages}
      <button className="btn btn-primary" onClick={props.onClose}>
        Okay, got it!
      </button>
    </div>
  );
};

export default Modal;
