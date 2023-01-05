import { useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './Modal.module.css';

export const Modal = ({ onClose, largeImg }) => {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        return onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleClickOnBackdrop = e => {
    if (e.target === e.currentTarget) {
      return onClose();
    }
  };

  return (
    <div className={styles.overlay} onClick={handleClickOnBackdrop}>
      <div className={styles.modal}>
        <img src={largeImg.largeImageURL} alt={largeImg.alt} />
      </div>
    </div>
  );
};

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  largeImg: PropTypes.shape({
    largeImageURL: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
  }).isRequired,
};
