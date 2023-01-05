import { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Modal.module.css';

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      return this.props.onClose();
    }
  };

  handleClickOnBackdrop = e => {
    if (e.target === e.currentTarget) {
      return this.props.onClose();
    }
  };

  render() {
    return (
      <div className={styles.overlay} onClick={this.handleClickOnBackdrop}>
        <div className={styles.modal}>
          <img
            src={this.props.largeImg.largeImageURL}
            alt={this.props.largeImg.alt}
          />
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  largeImg: PropTypes.shape({
    largeImageURL: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
  }).isRequired,
};
