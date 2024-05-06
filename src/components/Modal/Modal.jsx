import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

const Modal = ({ image, onCloseModal }) => {
  const overlayRef = useRef(null);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  });

  const handleKeyDown = e => {
    if (e.key === 'Escape') {
      onCloseModal();
    }
  };

  const handleClickOutside = e => {
    if (e.target === overlayRef.current) {
      onCloseModal();
    }
  };

  return (
    <div ref={overlayRef} className={css.overlay} onClick={handleClickOutside}>
      <div className={css.modal}>
        <img src={image.src} alt={image.alt} />
      </div>
    </div>
  );
};

Modal.propTypes = {
  image: PropTypes.object.isRequired,
  onCloseModal: PropTypes.func.isRequired,
};

export default Modal;
